package com.example.demo.user.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {
    private static final Logger logger = LoggerFactory.getLogger(JWTUtil.class);

    // Token expiration time (24 hours)
    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    // Token refresh threshold (e.g., 1 hour before expiration)
    private static final long REFRESH_THRESHOLD = 60 * 60 * 1000;

    @Value("${jwt.secret}")
    private String jwtSecret;

    /**
     * Generate a secure signing key using the JWT secret
     * @return SecretKey for JWT signing
     */
    private SecretKey getSigningKey() {
        if (jwtSecret == null || jwtSecret.trim().isEmpty()) {
            throw new IllegalStateException("JWT secret cannot be null or empty");
        }

        // Ensure the key is at least 256 bits (32 bytes)
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generate JWT token for a given email
     * @param email user email
     * @return JWT token string
     */
    public String generateToken(String email) {
        Date now = new Date(System.currentTimeMillis());
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validate JWT token with comprehensive checks
     * @param token JWT token string
     * @return boolean indicating token validity
     */
    public Boolean validateToken(String token) {
        try {
            // Parse and validate the token with the signing key
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // Current time
            Date currentTime = new Date();

            // Check expiration
            Date expirationDate = claims.getExpiration();
            if (expirationDate.before(currentTime)) {
                logger.warn("Token has expired");
                return false;
            }

            // Get issued at time
            Date issuedAt = claims.getIssuedAt();
            if (issuedAt == null) {
                logger.warn("Token has no issued at time");
                return false;
            }

            // Additional security checks
            long tokenAge = currentTime.getTime() - issuedAt.getTime();
            if (tokenAge > EXPIRATION_TIME) {
                logger.warn("Token is too old");
                return false;
            }

            return true;
        } catch (ExpiredJwtException e) {
            logger.error("Token expired: {}", e.getMessage());
            return false;
        } catch (SignatureException e) {
            logger.error("Invalid token signature: {}", e.getMessage());
            return false;
        } catch (Exception e) {
            logger.error("Token validation error", e);
            return false;
        }
    }

    /**
     * Extract email from JWT token
     * @param token JWT token string
     * @return email or null if extraction fails
     */
    public String getEmailFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (Exception e) {
            logger.error("Error extracting email from token", e);
            return null;
        }
    }

    /**
     * Check if token is close to expiration and should be refreshed
     * @param token JWT token string
     * @return boolean indicating if token needs refresh
     */
    public boolean shouldRefreshToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            Date expirationDate = claims.getExpiration();
            long timeUntilExpiration = expirationDate.getTime() - System.currentTimeMillis();

            return timeUntilExpiration < REFRESH_THRESHOLD;
        } catch (Exception e) {
            logger.error("Error checking token refresh", e);
            return false;
        }
    }
}
