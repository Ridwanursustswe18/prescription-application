import axios from "axios"
import { getToken } from "./auth";
const token = getToken();
export const monthlyPrescriptions = async () => {
  try {

    const result = await axios.get(
      "http://localhost:8080/api/v1/prescriptions/current-month",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
}
export const dateRangeBasedPrescripstion = async (startDate, endDate) => {
  try {
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
    const result = await axios.get('http://localhost:8080/api/v1/prescriptions/date-range', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        startDate: formattedStartDate,
        endDate: formattedEndDate
      }
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getAllPrescriptions = async () => {
  try {
    const result = await axios.get('http://localhost:8080/api/v1/prescriptions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data.data;
  } catch (error) {
    console.error(error);
  }
}
export const createPrescription = async (prescriptionData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/prescriptions/create', prescriptionData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data.data;
  } catch (error) {
    console.error("Error creating prescription:", error);
    throw error;
  }
};
export const getPrescriptionById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/prescriptions/${id}`, { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching prescription by ID:", error);
    throw error;
  }
};
export const updatePrescription = async (id, prescriptionData) => {
  try {
    const response = await axios.patch(`http://localhost:8080/api/v1/prescriptions/${id}`, prescriptionData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error updating prescription:", error);
    throw error;
  }
};
export const deletePrescription = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/prescriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting prescription:", error);
    throw error;
  }
};
export const getDaywisePrescriptionCount = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/prescriptions/count-by-date', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching day-wise prescription count:", error);
    throw error;
  }
};