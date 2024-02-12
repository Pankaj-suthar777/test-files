import { configureStore } from "@reduxjs/toolkit";
import { toastSlice } from "./toastSlice";
import { loaderSlice } from "./loadersSlice";
import { usersSlice } from "./usersSlice";
import { detailsSlice } from "./detailsSlice";

const store = configureStore({
  reducer: {
    toasts: toastSlice.reducer,
    loaders: loaderSlice.reducer,
    users: usersSlice.reducer,
    details: detailsSlice.reducer,
  },
});

export default store;
