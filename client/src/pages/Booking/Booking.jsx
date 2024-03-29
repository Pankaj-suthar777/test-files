import { useNavigate, useParams } from "react-router-dom";
import DatePickerForClient from "./DatePickerForClient";
import { useEffect, useState } from "react";
import { GetNotBookedSession } from "../../apicalls/appointment";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { SetToast } from "../../redux/toastSlice";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { Button, Typography } from "@mui/material";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedAvailableAppointments, setSelectedAvailableAppointments] =
    useState([]);
  console.log(selectedSession);
  console.log(appointments);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const res = await GetNotBookedSession(id);
      dispatch(SetLoader(false));
      if (res.success) {
        setAppointments(res.data);
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

  async function handleSelectAppointment() {
    setSelectedDate((newSelectedDate) => {
      // Filter appointments based on the new selected date and isPaid status
      setSelectedAvailableAppointments(
        appointments.filter((appointment) => {
          const appointmentDate = appointment.availabilityData.split(" ")[0];
          return appointmentDate === newSelectedDate && !appointment.isPaid;
        })
      );
      return newSelectedDate;
    });
  }

  useEffect(() => {
    getData();
  }, []);

  let formattedDate = "";
  if (
    selectedAvailableAppointments &&
    selectedAvailableAppointments.length > 0
  ) {
    const firstAppointment = selectedAvailableAppointments[0];
    const appointmentDate = new Date(
      firstAppointment?.availabilityData?.split(" ")[0]
    );
    formattedDate = appointmentDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="flex justify-center w-full">
      {appointments[0]?.service?.title ? (
        <div className="border border-black bg-white w-full mx-2 sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20 my-10">
          <div className="p-8">
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
          </div>
          <div className="p-8">
            <h1 className="font-bold text-[#0A2472]  z-0 text-4xl leading-snug tracking-wide mb-5">
              {appointments[0]?.service?.title}
            </h1>
            <p className="text-[#0A2472]  lg:text-lg text-md tracking-wider">
              Check out our availability and book the date and time that works
              for you
            </p>
          </div>
          <hr className="h-2 w-full border-1  border-b-black "></hr>
          <div className="grid xl:grid-cols-3 mb-10 lg:px-4 sm:px-1 lg:grid-cols-2 md:grid-cols-1">
            <div className="flex justify-center items-center">
              <div className="">
                <DatePickerForClient
                  handleSelectAppointmant={handleSelectAppointment}
                  setSelectedDate={setSelectedDate}
                ></DatePickerForClient>
              </div>
            </div>

            <div className="px-1 xl:mt-0 mt-10 py-1 xl:p-8 flex  flex-col gap-4 overflow-scroll ">
              <p className="text-[rgb(10,36,114)]  lg:text-lg text-center w-full text-md tracking-wider">
                <div>
                  {formattedDate === "" ? "Select another date" : formattedDate}
                </div>
                <div className="mt-5">
                  {formattedDate === "" ? (
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        if (appointments.length > 0) {
                          const firstAppointment = appointments[0];
                          setSelectedAvailableAppointments([firstAppointment]);
                          setSelectedSession({
                            sessionid: firstAppointment?._id,
                            time: firstAppointment?.availabilityData?.split(
                              " "
                            )[1],
                            date: firstAppointment?.availabilityData?.split(
                              " "
                            )[0],
                            serviceId: id,
                          });
                        }
                      }}
                    >
                      {appointments.length < 0
                        ? "sessions is not available"
                        : "Next availability"}
                    </Button>
                  ) : null}
                </div>
              </p>
              <div className="w-full flex justify-center">
                <div className="flex flex-wrap justify-center gap-4  max-w-[400px]">
                  {selectedDate === "" &&
                  selectedSession === "" &&
                  formattedDate !== "" &&
                  appointments.length > 0 ? (
                    <div className="w-full h-[200px] flex justify-center items-center">
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          if (appointments.length > 0) {
                            const firstAppointment = appointments[0];
                            setSelectedAvailableAppointments([
                              firstAppointment,
                            ]);
                            setSelectedSession({
                              sessionid: firstAppointment?._id,
                              time: firstAppointment?.availabilityData?.split(
                                " "
                              )[1],
                              date: firstAppointment?.availabilityData?.split(
                                " "
                              )[0],
                              serviceId: id,
                            });
                          }
                        }}
                      >
                        {appointments.length < 0
                          ? "sessions is not available"
                          : "Next availability"}
                      </Button>
                    </div>
                  ) : (
                    selectedAvailableAppointments?.map((appointment) => (
                      <div
                        key={appointment._id}
                        className={`border border-black h-12 flex justify-center items-center px-5 rounded-3xl ease-in delay-75 hover:bg-blue-100 active:scale-95 cursor-pointer hover:shadow-md transition duration-300 ${
                          selectedSession.sessionid === appointment._id
                            ? "bg-blue-200"
                            : ""
                        } `}
                        onClick={() =>
                          setSelectedSession({
                            sessionid: appointment?._id,
                            time: appointment?.availabilityData?.split(" ")[1],
                            date: appointment?.availabilityData?.split(" ")[0],
                            serviceId: id,
                          })
                        }
                        style={{
                          color: "#333",
                          border: "1px solid #ccc",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition:
                            "background-color 0.3s, color 0.3s, transform 0.3s",
                        }}
                      >
                        {
                          appointment?.availabilityData
                            .split(" ")[1]
                            .split("-")[0]
                        }
                        :
                        {
                          appointment?.availabilityData
                            .split(" ")[1]
                            .split("-")[1]
                        }{" "}
                        {
                          appointment?.availabilityData
                            .split(" ")[1]
                            .split("-")[2]
                        }
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="mx-5 mt-0 ">
              <Card className="w-full pt-8 h-[320px]">
                <CardBody>
                  <p className="text-[#0A2472]  w-full text-lg  mb-5">
                    Service Details
                  </p>
                  <p className="text-[#0A2472]   w-full text-sm mb-1">
                    {appointments[0]?.service?.title}
                  </p>
                  <p className="text-[#0A2472]   w-full text-sm  mb-3">
                    {selectedSession.time
                      ? `${formattedDate}, at
                    ${selectedSession.time}`
                      : "Select time and date of session"}
                  </p>

                  <p className="text-[#0A2472]  lg:text-md w-full text-sm">
                    San Francisco
                  </p>
                  <p className="text-[#0A2472]  lg:text-md w-full text-sm">
                    Markus Rau
                  </p>

                  <p className="text-[#0A2472]  lg:text-md w-full text-sm">
                    {appointments[0]?.service?.duration}
                  </p>
                  <p className="text-[#0A2472]  lg:text-md w-full text-sm">
                    ${appointments[0]?.service?.price}
                  </p>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full"
                    variant="contained"
                    disabled={!selectedSession.time}
                    onClick={() => {
                      navigate(`add-your-deatils/${selectedSession.sessionid}`);
                    }}
                  >
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-black h-[60vh] flex flex-col justify-center items-center bg-white mx-20 w-full my-10 pb-12">
          <div className="w-[150px] justify-start mr-60 mb-5 flex">
            <Button
              variant="text"
              size="large"
              className="flex gap-2 items-center border-none"
              onClick={() => {
                navigate("/services");
              }}
            >
              <i className="ri-arrow-left-s-line text-xl"></i>Back
            </Button>
          </div>
          <h1 className="md:text-3xl text-2xl">
            This service is not available
          </h1>
        </div>
      )}
    </div>
  );
};

export default Booking;
