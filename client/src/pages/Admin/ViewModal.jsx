import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";

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
    width: "350px",
  },
};

export default function ViewModal({ open, setOpen, setServices }) {
  const details = useSelector((state) => state.details);
  console.log(details);

  return (
    <div className="w-screen">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center w-full sm:text-3xl text-xl mt-10 mb-10">
            Appointment Details
          </h1>
          <div className="w-full mb-12 bg-white flex justify-center gap-4 flex-col items-center">
            <div>
              <span className="sm:text-lg text=sm">Service :</span>
              <span className="sm:text-lg text=sm">
                &nbsp;{details.serviceTitle}
              </span>
            </div>
            <div>
              <span className="sm:text-lg text=sm">Date and Time :</span>
              <span className="sm:text-lg text=sm">
                &nbsp;{details.availabilityData}
              </span>
            </div>
            <div>
              <span className="sm:text-lg text=sm">Name :</span>
              <span className="sm:text-lg text=sm">&nbsp;{details.name}</span>
            </div>
            <div>
              <span className="sm:text-lg text=sm">Email :</span>
              <span className="sm:text-lg text=sm">&nbsp;{details.email}</span>
            </div>
            <div>
              <span className="sm:text-lg text=sm">Phone :</span>
              <span className="sm:text-lg text=sm">
                &nbsp;
                {details.phone
                  ? details.phone
                  : "phone nuber is not given by client"}
              </span>
            </div>
            <div>
              <span className="sm:text-lg text=sm">Message :</span>
              <span className="sm:text-lg text=sm">
                &nbsp;{details.message}
              </span>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
