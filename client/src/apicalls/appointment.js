import { axiosInstance } from "./axiosInstance";

// get all booked appointment
export const GetBookedAppointment = async () => {
  try {
    const response = await axiosInstance.get("/api/apponitment");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get user booked appointment
export const GetUserBookedAppointment = async () => {
  try {
    const response = await axiosInstance.get("/api/apponitment/user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// add appointment
export const AddAppointment = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/apponitment/add", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get service
export const GetCurrentSer = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/apponitment/current/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
// get checkout appointment
export const GetCheckOutAppointment = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/apponitment/current/process/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
