import { createSlice } from "@reduxjs/toolkit";

export const detailsSlice = createSlice({
  name: "detailsSlice",
  initialState: {
    serviceTitle: "",
    availabilityData: "",
    phone: "",
    message: "",
    email: "",
    name: "",
  },
  reducers: {
    SetDetails: (state, action) => {
      state.serviceTitle = action.payload.serviceTitle;
      state.availabilityData = action.payload.availabilityData;
      state.phone = action.payload.phone;
      state.message = action.payload.message;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export const { SetDetails } = detailsSlice.actions;
