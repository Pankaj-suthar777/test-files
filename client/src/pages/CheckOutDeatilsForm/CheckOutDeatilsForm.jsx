import {
  Alert,
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GetAService } from "../../apicalls/service";
import { SetToast } from "../../redux/toastSlice";
import { GetCheckOutAppointment } from "../../apicalls/appointment";
import { loadStripe } from "@stripe/stripe-js";
import { SetLoader } from "../../redux/loadersSlice";

const CheckOutDeatilsForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const [service, setService] = useState("");
  const [session, setSession] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const { id, sessionId } = useParams();

  async function getData() {
    try {
      const res1 = await GetAService(id);
      if (res1.success) {
        setService(res1.data);
        console.log(res1);
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

  async function getSession() {
    try {
      const res = await GetCheckOutAppointment(sessionId);
      setSession(res.data);
      console.log(res.data);
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

  async function makeAppointmentConfirm() {
    dispatch(SetLoader(true));
    const res = await GetCheckOutAppointment(sessionId);
    if (res.data.isBooked === false) {
      const resAppontment = await GetCheckOutAppointment(sessionId);
      if (!resAppontment.isBooked) {
        const stripe = await loadStripe(
          "pk_test_51OhvW7Gr7paNn0fxbC8fWbjyifJHhT5vKdT8IR2oz8X8bAbz0oiJaqHMg8B9bUjNaEwBffNgspnjAR0QlISGQPel00EN3uyBLK"
        );
        const order = {
          appointmentId: session._id,
          price: service.price,
          serviceTitle: service.title,
          clientId: user._id,
          isPaid: true,
          isBooked: true,
          profilePicture: user.profilePicture,
          phone: phone,
          message: message,
          email: email === "" ? user.email : email,
          name: name === "" ? user.name : name,
        };
        let sessionArray = [];
        sessionArray.push(order);
        console.log(sessionArray);
        const body = {
          sessionArray: sessionArray,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await fetch(
          "http://localhost:5000/api/create-checkout-process",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
        );
        const sess = await response.json();
        dispatch(SetLoader(false));
        const result = stripe.redirectToCheckout({
          sessionId: sess.id,
        });
        if (result.error) {
          console.log(result.error);
          dispatch(SetLoader(false));
        } else {
          dispatch(SetLoader(false));
        }
      } else {
        navigate("/services");
        dispatch(
          SetToast({
            open: true,
            message: "Some one has already booked the seesion",
            type: "info",
          })
        );
      }
    } else {
      dispatch(
        SetToast({
          open: true,
          message: "Somebooked session before you",
          type: "info",
        })
      );
      navigate("/services");
    }
  }

  useEffect(() => {
    getData();
    getSession();
  }, []);

  let formattedDate = "";
  if (session) {
    const availabilityDate = session?.availabilityData?.split(" ")[0];
    const dateComponents = availabilityDate.split("/");
    const year = dateComponents[0];
    const month = dateComponents[1];
    const day = dateComponents[2];
    const date = new Date(year, month - 1, day);
    formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="flex justify-center w-full">
      <div className="border border-black bg-white w-full mx-2 sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20 my-10 sm:p-8 p-4 flex lg:flex-row flex-col">
        <div className="w-full">
          <Button
            variant="text"
            size="large"
            className="flex gap-2 justify-center items-center border-none"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="ri-arrow-left-s-line text-xl"></i>Back
          </Button>
          <h1 className=" text-[#0A2472]  z-0 text-xl font-semibold  mt-8">
            Client Details
          </h1>
          <div className="border-t-[2px] mt-5 border-gray-500"></div>

          <div className="mt-6">
            <p className=" text-[#0A2472]  z-0 text-md">
              Tell us a bit about yourself
            </p>
            <Alert variant="ghost" className="mt-10">
              <span>
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="underline cursor-pointer"
                >
                  Log In
                </span>{" "}
                for faster booking.
              </span>
            </Alert>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex gap-4 sm:flex-row flex-col">
                <div className="w-full">
                  <Input
                    variant="standard"
                    label="Name *"
                    placeholder="Standard"
                    value={name}
                    className="w-full"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-10 sm:mt-0 w-full">
                  <Input
                    className="w-full"
                    variant="standard"
                    label="Email *"
                    placeholder="Standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-12 mt-6">
                <Input
                  variant="standard"
                  label="Phone Number"
                  placeholder="Standard"
                  className="col-span-2"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Textarea
                  variant="standard"
                  label="And Your Message"
                  className="col-span-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <Card className="pt-8 h-full w-full" shadow={false}>
          <CardBody>
            <p className="text-[#0A2472]  w-full text-lg  mb-6">
              Booking Details
            </p>
            <p className="text-[#0A2472]  lg:text-md w-full text-lg ">
              {service.title}
            </p>
            <p className="text-[#0A2472]  lg:text-md w-full text-lg ">
              {formattedDate} at{" "}
              {session.availabilityData?.split(" ")[1]?.split("-")[0]}:
              {session.availabilityData?.split(" ")[1]?.split("-")[1]}{" "}
              {session.availabilityData?.split(" ")[1]?.split("-")[2]}
            </p>
            <p className="text-[#0A2472]  lg:text-md w-full text-sm mt-3">
              San Francisco
            </p>

            <p className="text-[#0A2472]  lg:text-md w-full text-sm">
              Markus Rau
            </p>
            <p className="text-[#0A2472]  lg:text-md w-full text-sm">
              {service.duration}
            </p>
            <div className="border-t-[2px] mt-11 mb-7 border-gray-500"></div>
            <p className="text-[#0A2472]  w-full text-lg  mb-6">
              Payment Details
            </p>
            <div className="flex justify-between">
              <p className="text-[#0A2472]  w-full text-lg">Total</p>
              <p>${service.price}</p>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="w-full rounded-3xl"
              variant="contained"
              onClick={() => {
                if (localStorage.getItem("token")) {
                  makeAppointmentConfirm();
                } else {
                  navigate("/login");
                }
              }}
            >
              Book Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CheckOutDeatilsForm;
