import { axiosInstance } from "./axiosInstance";

// add service
export const AddService = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/service/add-service",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all services
export const GetAllServices = async () => {
  try {
    const response = await axiosInstance.get("/api/service/get-services");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//update user
export const EditService = async (payload) => {
  try {
    const response = await axiosInstance.put(`/api/service/edit`, payload);

    return response.data;
  } catch (error) {
    return error.message;
  }
};

//update user
export const GetAService = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/service/${id}`);

    return response.data;
  } catch (error) {
    return error.message;
  }
};

//delete service
export const DeleteService = async (serviceId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/service/delete-service/${serviceId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// add sevice avaibility

export const AddServiceAvaibilityApi = async (serviceId, availabilityData) => {
  try {
    const response = await axiosInstance.put(
      `/api/service/add/availability/${serviceId}`,
      {
        availabilityData,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
