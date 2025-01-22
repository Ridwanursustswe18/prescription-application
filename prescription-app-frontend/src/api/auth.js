import axios from 'axios';

const login = async (email, password) => {
  try {
    const result = await axios.post("http://localhost:8080/api/v1/users/login", {
      email: email,
      password: password,
    });
    console.log(result.data.data.token);
    if (result.data.data.token) {
      console.log(result.data.token);
      localStorage.setItem('authToken', result.data.data.token);
    }
    return { success: true }; 
  } catch (error) {
    console.error("Login failed:", error);
    return { error: error.message || "Login failed" };
  }
};

const getToken = () => {
    return localStorage.getItem('authToken');
  };

export { login, getToken}; 
