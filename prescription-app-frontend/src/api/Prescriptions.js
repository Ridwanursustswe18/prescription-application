import axios from "axios"
import { getToken } from "./auth";
const token = getToken();
export const monthlyPrescriptions = async () => {
    try{
        
        const result = await axios.get(
            "http://localhost:8080/api/v1/prescriptions/current-month",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );      
        return result;
    }catch(error){
        console.error(error);
    }    
}
export const dateRangeBasedPrescripstion = async (startDate,endDate) => {
  try{
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
    const result = await axios.get('http://localhost:8080/api/v1/prescriptions/date-range',{
      headers:{
        Authorization: `Bearer ${token}`,
      },
      params:{
        startDate:formattedStartDate,
        endDate:formattedEndDate
      }
    });
    return result;
  }catch(error){
    console.error(error);
  }
};
export const getAllPrescriptions = async () => {
  try{
    const result = await axios.get('http://localhost:8080/api/v1/prescriptions',{
      headers:{
        Authorization: `Bearer ${token}`,
      },
  });
  return result.data.data;
  }catch(error){
    console.error(error);
  }
} 