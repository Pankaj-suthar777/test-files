import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TabsScroll from "../../components/Tabs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  borderRadius: "8px",
  width: "800px",
  "@media (width< 840px)": {
    width: "600px",
  },
  "@media (width< 640px)": {
    width: "450px",
  },
  "@media (width< 480px)": {
    width: "380px",
  },
};

export default function EditModal({ open, setOpen }) {
  return (
    <div className="w-screen">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center w-full text-3xl mt-10 mb-10">
            Edit Profile
          </h1>
          <div className="w-full mb-12 bg-white">
            <TabsScroll open={open} setOpen={setOpen}></TabsScroll>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
