import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetToast } from "../../redux/toastSlice";
import { SetLoader } from "../../redux/loadersSlice";
import { useEffect, useState } from "react";
import { RegisterUser } from "../../apicalls/users";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loaders = useSelector((state) => state.loaders);

  const dispatch = useDispatch();
  async function formHandller(e) {
    e.preventDefault();
    dispatch(SetLoader(true));
    if (password.length < 4) {
      dispatch(
        SetToast({
          open: true,
          message: "Password is to short",
          type: "warning",
        })
      );
    }

    try {
      const response = await RegisterUser({ email, password, name });
      if (response.success) {
        dispatch(
          SetToast({
            open: true,
            message: "User created successfully",
            type: "success",
          })
        );
        dispatch(SetLoader(false));
        navigate("/login");
      } else {
        dispatch(SetLoader(false));
        throw new Error(response.message);
      }
    } catch (error) {
      SetToast({
        open: true,
        message: error.message,
        type: "warning",
      });
      dispatch(SetLoader(false));
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <Card shadow={false} className="sm:p-8 px-4 py-8">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={formHandller}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            className="mt-6 flex justify-center items-center"
            fullWidth
            type="submit"
          >
            {loaders.loading && (
              <Spinner color="blue" className="h-4 w-4 mr-2 " />
            )}
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <span
              className="font-medium text-gray-900 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
