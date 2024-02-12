import { axiosInstance } from "./axiosInstance";

// register user
export const RegisterUser = async (payload) => {
  axiosInstance.defaults.withCredentials = true;
  try {
    const response = await axiosInstance.post(`/api/users/signup`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//login user
export const LoginUser = async (payload) => {
  axiosInstance.defaults.withCredentials = true;
  try {
    const response = await axiosInstance.post(`/api/users/login`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get current user
export const GetCurrentUser = async () => {
  axiosInstance.defaults.withCredentials = true;
  try {
    const response = await axiosInstance.get(`/api/users/get-current-user`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all user
export const GetAllUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-all-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//update user
export const EditUserProfile = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/edit-user/${id}`,
      payload
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload a image
export const UploadUserImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/users/upload-image-to-user/`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//update user
export const GetUserOfAppointment = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/get/user-appointment/${id}`
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};
