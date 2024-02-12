import { useState } from "react";
import { Input, Select, Option, Spinner } from "@material-tailwind/react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AddService } from "../../apicalls/service";
import { SetToast } from "../../redux/toastSlice";
import { SetLoader } from "../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";

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

export default function AddServiceModal({ open, setOpen, setServices }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState("30 minutes");
  const { loading } = useSelector((state) => state.loaders);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(SetLoader(true));
      const response = await AddService({ title, price, duration });
      dispatch(SetLoader(false));
      setOpen(false);
      if (response.success) {
        dispatch(
          SetToast({
            open: true,
            message: "Service added successfully",
            type: "success",
          })
        );
        setServices((pre) => {
          return [{ title, duration, price }, ...pre];
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      dispatch(
        SetToast({
          open: true,
          message: error.message,
          type: "warning",
        })
      );
    }
  }

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
            Add Service
          </h1>
          <div className="w-full mb-12 bg-white">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6 px-8">
                <Input
                  color="indigo"
                  label="Title"
                  className="w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  color="indigo"
                  label="Price"
                  type="number"
                  className="w-full"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Select
                  label="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e)}
                >
                  <Option value="30 minutes">30 minutes</Option>
                  <Option value="45 minutes">45 minutes</Option>
                  <Option value="1 hour">1 hour</Option>
                  <Option value="1 hour 15 minutes">1 hour 15 minutes</Option>
                  <Option value="1 hour 30 minutes">1 hour 30 minutes</Option>
                  <Option value="1 hour 45 minutes">1 hour 45 minutes</Option>
                  <Option value="2 hour">2 hour</Option>
                  <Option value="2 hour 15 minutes">2 hour 15 minutes</Option>
                  <Option value="2 hour 30 minutes">2 hour 30 minutes</Option>
                  <Option value="2 hour 45 minutes">2 hour 45 minutes</Option>
                  <Option value="3 hour">3 hour</Option>
                </Select>

                <Button
                  variant="contained"
                  className="w-full flex justify-center items-center gap-3"
                  type="submit"
                >
                  <i className="ri-add-line text-xl"></i> Add Service
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
