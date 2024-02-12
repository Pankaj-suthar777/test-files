import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { SetToast } from "../../redux/toastSlice";

import { useDispatch } from "react-redux";
import DatePickerComponent from "../../components/DatePicker";
import TimePickerComponenet from "../../components/TimePickerComponenet";
import { AddAppointment } from "../../apicalls/appointment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  borderRadius: "8px",
  width: "800px",
  "@media (max-width: 840px)": {
    width: "600px",
  },
  "@media (max-width: 640px)": {
    width: "450px",
  },
  "@media (max-width: 480px)": {
    width: "380px",
  },
};

export default function AddServiceAvaibility({
  openAddServiceAvaibility,
  setOpenAddServiceAvaibility,
  serviceId,
}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const availabilityData = `${date} ${time}`;

      const res = await AddAppointment({
        availabilityData, // Ensure this field matches the backend schema
        service: serviceId,
      });
      setLoading(false);
      setConfirm(true);
      setOpenAddServiceAvaibility(false);
      if (res.success) {
        dispatch(
          SetToast({
            open: true,
            message: res.message,
            type: "success",
          })
        );
      }
    } catch (error) {
      console.error("Error adding service availability:", error);
      dispatch(
        SetToast({
          open: true,
          message: error.message,
          type: "warning",
        })
      );
    }
  };

  return (
    <div className="w-screen">
      <Modal
        open={openAddServiceAvaibility}
        onClose={() => setOpenAddServiceAvaibility(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center w-full text-3xl mt-10 mb-10">
            Add Service Avaibility
          </h1>
          <div className="w-full mb-12 bg-white">
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-6 px-8">
                <DatePickerComponent
                  date={date}
                  setDate={setDate}
                ></DatePickerComponent>
                <TimePickerComponenet
                  setTime={setTime}
                  setConfirm={setConfirm}
                ></TimePickerComponenet>

                <Button
                  variant="contained"
                  className="w-full flex justify-center items-center gap-2"
                  type="submit"
                  disabled={!confirm || date.length === 0 || time.length === 0}
                >
                  <i className="ri-save-line text-xl"></i>
                  Add Service Avaibility
                </Button>
              </div>
              <div className="w-full flex justify-center items-center mt-5">
                {loading && <Spinner className="h-12 w-12"></Spinner>}
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
