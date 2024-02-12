import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch } from "react-redux";
import { SetToast } from "../redux/toastSlice";

export default function Toast({ toasts }) {
  const dispatch = useDispatch();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={toasts.open}
      autoHideDuration={5000}
      onClose={() => dispatch(SetToast({ open: false, message: "" }))}
      key={"top" + "center"}
    >
      <Alert
        onClose={() => dispatch(SetToast({ open: false, message: "" }))}
        severity={toasts.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toasts.message}
      </Alert>
    </Snackbar>
  );
}
