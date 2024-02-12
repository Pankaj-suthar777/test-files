import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toasts",
  initialState: {
    open: false,
    message: "",
    type: "success",
  },
  reducers: {
    SetToast: (state, action) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { SetToast } = toastSlice.actions;
