import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { SetToast } from "../../redux/toastSlice";
import { SetLoader } from "../../redux/loadersSlice";
import { LoginUser } from "../../apicalls/users";
import { axiosInstance } from "../../apicalls/axiosInstance";
import axios from "axios";
axios.defaults.withCredentials = true;
axiosInstance.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loaders = useSelector((state) => state.loaders);

  const dispatch = useDispatch();
  async function formHandller(e) {
    e.preventDefault();

    if (password.length < 4) {
      dispatch(
        SetToast({
          open: true,
          message: "Password is to short",
          type: "warning",
        })
      );
    }
    dispatch(SetLoader(true));
    try {
      const response = await LoginUser({ email, password });

      if (response.success) {
        localStorage.setItem("token", response.data);
        window.location.href = "/";
        dispatch(SetLoader(false));
      } else {
        throw new Error(response.message);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <Card shadow={true} className="sm:p-8 px-4 py-8 ">
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>

          <form className="mt-8 mb-2 w-80  sm:w-96" onSubmit={formHandller}>
            <div className="mb-1 flex flex-col gap-6">
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
              className="mt-6 flex justify-center items-center "
              fullWidth
              type="submit"
            >
              {loaders.loading && (
                <Spinner color="blue" className="h-4 w-4 mr-2 " />
              )}
              sign in
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <span
                className="font-medium text-gray-900 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
