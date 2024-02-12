import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";

import Button from "@mui/material/Button";

import { TextField } from "@mui/material";
import { EditUserProfile } from "../apicalls/users";
import { SetToast } from "../redux/toastSlice";
import { SetUser } from "../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
} from "@material-tailwind/react";

export default function TabsScroll({ open, setOpen }) {
  const { user } = useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set initial values when user data changes
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  async function formHandler(e) {
    e.preventDefault();
    dispatch(SetLoader(true));
    try {
      if (password.length > 1) {
        if (password === confirmPassword) {
          const res = await EditUserProfile(user._id, {
            name,
            email,
            password,
          });
          dispatch(SetLoader(false));
          if (res.success) {
            dispatch(
              SetToast({
                open: true,
                message: "Password changed successfully",
                type: "success",
              })
            );
            dispatch(SetUser({ ...user, email, name, password }));
          }
        } else {
          dispatch(
            SetToast({
              open: true,
              message: "Password does not match the confirm password",
              type: "warning",
            })
          );
        }
      } else {
        dispatch(SetLoader(true));
        const res = await EditUserProfile(user._id, { name, email });
        if (res.success) {
          dispatch(
            SetToast({
              open: true,
              message: "Profile updated",
              type: "success",
            })
          );
          dispatch(SetLoader(false));
          dispatch(SetUser({ ...user, email, name }));
          setOpen(false); // Close the modal
        }
      }
    } catch (error) {
      dispatch(
        SetToast({
          open: true,
          message: error.message,
          type: "warning",
        })
      );
    }
  }
  const data = [
    {
      label: "Edit your details",
      value: 1,
      desc: (
        <form
          className="md:px-6 px-0 flex flex-col gap-4 w-full"
          onSubmit={formHandler}
        >
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Confirm Password"
            variant="filled"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button variant="contained" color="success" type="submit">
            Save
          </Button>
          {loading && (
            <div className="w-full flex justify-center items-center mt-1">
              <Spinner className="h-10 w-10"></Spinner>
            </div>
          )}
        </form>
      ),
    },
    {
      label: "Image Upload",
      value: 2,
      desc: <ImageUpload></ImageUpload>,
    },
  ];

  return (
    <Tabs value="html">
      <TabsHeader className="px-2">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
