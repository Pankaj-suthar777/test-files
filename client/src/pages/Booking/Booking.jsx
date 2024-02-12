// import { useNavigate, useParams } from "react-router-dom";

// import DatePickerForClient from "./DatePickerForClient";
// import { useEffect, useState } from "react";
// import { GetCurrentSer } from "../../apicalls/appointment";

// import { useDispatch } from "react-redux";
// import { SetLoader } from "../../redux/loadersSlice";
// import { SetToast } from "../../redux/toastSlice";

// import { Card, CardBody, CardFooter } from "@material-tailwind/react";
// import { Button } from "@mui/material";

// const Booking = () => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [appointments, setAppointments] = useState([]);
//   const [selectedSession, setSelectedSession] = useState({});
//   const [selectedAvailableAppointments, setSelectedAvailableAppointments] =
//     useState([]);

//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   async function getData() {
//     try {
//       dispatch(SetLoader(true));
//       const res = await GetCurrentSer(id);
//       dispatch(SetLoader(false));
//       // console.log(res.data);
//       if (res.success) {
//         setAppointments(res.data);
//       }
//     } catch (error) {
//       dispatch(
//         SetToast({
//           open: true,
//           message: error.message,
//           type: "warning",
//         })
//       );
//     }
//   }

//   async function handleSelectAppointmant() {
//     setSelectedDate((newSelectedDate) => {
//       // Filter appointments based on the new selected date and isPaid status
//       setSelectedAvailableAppointments(
//         appointments.filter((s) => {
//           const appointmentDate = s.availabilityData.split(" ")[0];
//           return appointmentDate === newSelectedDate && !s.isPaid;
//         })
//       );
//       return newSelectedDate;
//     });
//   }

//   useEffect(() => {
//     getData();
//   }, []);
//   let formattedDate = "";
//   if (
//     selectedAvailableAppointments &&
//     selectedAvailableAppointments.length > 0
//   ) {
//     const firstAppointment = selectedAvailableAppointments[0];
//     const appointmentDate = new Date(
//       firstAppointment.availabilityData.split(" ")[0]
//     );
//     formattedDate = appointmentDate.toLocaleDateString("en-US", {
//       weekday: "long", // Full name of the day of the week (e.g., "Sunday")
//       month: "long", // Full name of the month (e.g., "February")
//       day: "numeric", // Day of the month (e.g., "8")
//     });
//   }

//   return (
//     <div className="flex justify-center w-full">
//       {appointments[0]?.service?.title ? (
//         <div className="border border-black bg-white w-full mx-2 sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20 my-10">
//           <div className="p-8">
//             <Button
//               variant="text"
//               size="large"
//               className="flex gap-2 justify-center items-center border-none"
//               onClick={() => {
//                 navigate(-1);
//               }}
//             >
//               <i className="ri-arrow-left-s-line text-xl"></i>Back
//             </Button>
//           </div>
//           <div className="p-8">
//             <h1 className="font-bold text-[#0A2472]  z-0 text-4xl leading-snug tracking-wide mb-5">
//               {appointments[0]?.service?.title}
//             </h1>
//             <p className="text-[#0A2472]  lg:text-lg text-md tracking-wider">
//               Check out our availability and book the date and time that works
//               for you
//             </p>
//           </div>
//           <hr className="h-2 w-full border-1  border-b-black "></hr>
//           <div className="grid xl:grid-cols-3 mb-10 lg:px-4 sm:px-1 lg:grid-cols-2 md:grid-cols-1">
//             <div className="flex justify-center items-center">
//               {/* <h1 className="font-semibold text-[#0A2472]  z-0 text-xl leading-snug tracking-wide font-sans">
//                 Select a Date and Time
//               </h1> */}
//               <div className="">
//                 <DatePickerForClient
//                   handleSelectAppointmant={handleSelectAppointmant}
//                   setSelectedDate={setSelectedDate}
//                 ></DatePickerForClient>
//               </div>
//             </div>

//             <div className="px-1 xl:mt-0 mt-10 py-1 xl:p-8 flex  flex-col gap-4 overflow-scroll ">
//               <p className="text-[#0A2472]  lg:text-lg text-center w-full text-md tracking-wider">
//                 {formattedDate ? formattedDate : "Select another date"}
//               </p>
//               <div className="w-full flex justify-center">
//                 <div className="flex flex-wrap justify-center gap-4  max-w-[400px]">
//                   {selectedDate === "" ? (
//                     <div className="w-full h-[200px] flex justify-center items-center">
//                       <Button
//                         variant="contained"
//                         onClick={(e) => {
//                           if (appointments.length > 0) {
//                             const firstAppointment = appointments[0];
//                             setSelectedAvailableAppointments([
//                               firstAppointment,
//                             ]);
//                             setSelectedSession({
//                               sessionid: firstAppointment._id,
//                               time: firstAppointment.availabilityData.split(
//                                 " "
//                               )[1],
//                               date: firstAppointment.availabilityData.split(
//                                 " "
//                               )[0],
//                               serviceId: id,
//                             });
//                           }
//                         }}
//                       >
//                         Next availability
//                       </Button>
//                     </div>
//                   ) : (
//                     selectedAvailableAppointments?.map((s) => (
//                       <div
//                         key={s._id}
//                         className={`border border-black h-12 flex justify-center items-center px-5 rounded-3xl ease-in delay-75 hover:bg-blue-100 active:scale-95 cursor-pointer hover:shadow-md transition duration-300 ${
//                           selectedSession.sessionid === s._id
//                             ? "bg-blue-200"
//                             : ""
//                         } `}
//                         onClick={() =>
//                           setSelectedSession({
//                             sessionid: s._id,
//                             time: s.availabilityData.split(" ")[1],
//                             date: s.availabilityData.split(" ")[0],
//                             serviceId: id,
//                           })
//                         }
//                         style={{
//                           // Additional styles for button-like appearance

//                           color: "#333", // Change text color
//                           border: "1px solid #ccc", // Add border
//                           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add box shadow
//                           transition:
//                             "background-color 0.3s, color 0.3s, transform 0.3s", // Add transition effect
//                         }}
//                       >
//                         {s.availabilityData.split(" ")[1].split("-")[0]}:
//                         {s.availabilityData.split(" ")[1].split("-")[1]}{" "}
//                         {s.availabilityData.split(" ")[1].split("-")[2]}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mx-5 mt-0 xl:mt-[60px]">
//               <Card className="w-full pt-8 h-[320px]">
//                 <CardBody>
//                   <p className="text-[#0A2472]  w-full text-md  mb-6">
//                     Service Details
//                   </p>
//                   <p className="text-[#0A2472]   w-full text-sm  mb-3">
//                     {selectedSession.time
//                       ? `${appointments[0]?.service?.title} ${formattedDate}, at
//                     ${selectedSession.time}`
//                       : "Select time and date of session"}
//                   </p>

//                   <p className="text-[#0A2472]  lg:text-md w-full text-sm">
//                     San Francisco
//                   </p>
//                   <p className="text-[#0A2472]  lg:text-md w-full text-sm">
//                     Markus Rau
//                   </p>

//                   <p className="text-[#0A2472]  lg:text-md w-full text-sm">
//                     {appointments[0]?.service?.duration}
//                   </p>
//                   <p className="text-[#0A2472]  lg:text-md w-full text-sm">
//                     ${appointments[0]?.service?.price}
//                   </p>
//                 </CardBody>
//                 <CardFooter className="pt-0">
//                   <Button
//                     className="w-full"
//                     variant="contained"
//                     disabled={!selectedSession.time}
//                     onClick={() => {
//                       navigate(`add-your-deatils/${selectedSession.sessionid}`);
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="border border-black h-[60vh] flex flex-col justify-center items-center bg-white mx-20 w-full my-10 pb-12">
//           <div className="w-[150px] justify-start mr-60 mb-5 flex">
//             <Button
//               variant="text"
//               size="large"
//               className="flex gap-2 items-center border-none"
//               onClick={() => {
//                 // (window.location.href = "/services")
//                 navigate("/services");
//               }}
//             >
//               <i className="ri-arrow-left-s-line text-xl"></i>Back
//             </Button>
//           </div>
//           <h1 className="text-3xl">this service is not available</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;
import { useNavigate, useParams } from "react-router-dom";
import DatePickerForClient from "./DatePickerForClient";
import { useEffect, useState } from "react";
import { GetCurrentSer } from "../../apicalls/appointment";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { SetToast } from "../../redux/toastSlice";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { Button } from "@mui/material";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedSession, setSelectedSession] = useState({});
  const [selectedAvailableAppointments, setSelectedAvailableAppointments] =
    useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const res = await GetCurrentSer(id);
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
      firstAppointment.availabilityData.split(" ")[0]
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
              <p className="text-[#0A2472]  lg:text-lg text-center w-full text-md tracking-wider">
                {formattedDate ? formattedDate : "Select another date"}
              </p>
              <div className="w-full flex justify-center">
                <div className="flex flex-wrap justify-center gap-4  max-w-[400px]">
                  {selectedDate === "" ? (
                    <div className="w-full h-[200px] flex justify-center items-center">
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          if (appointments.length > 0) {
                            const firstAppointment = appointments.find(
                              (appointment) => !appointment.isPaid
                            );
                            setSelectedAvailableAppointments([
                              firstAppointment,
                            ]);
                            setSelectedSession({
                              sessionid: firstAppointment._id,
                              time: firstAppointment.availabilityData.split(
                                " "
                              )[1],
                              date: firstAppointment.availabilityData.split(
                                " "
                              )[0],
                              serviceId: id,
                            });
                          }
                        }}
                      >
                        Next availability
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
                            sessionid: appointment._id,
                            time: appointment.availabilityData.split(" ")[1],
                            date: appointment.availabilityData.split(" ")[0],
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
                          appointment.availabilityData
                            .split(" ")[1]
                            .split("-")[0]
                        }
                        :
                        {
                          appointment.availabilityData
                            .split(" ")[1]
                            .split("-")[1]
                        }{" "}
                        {
                          appointment.availabilityData
                            .split(" ")[1]
                            .split("-")[2]
                        }
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="mx-5 mt-0 xl:mt-[60px]">
              <Card className="w-full pt-8 h-[320px]">
                <CardBody>
                  <p className="text-[#0A2472]  w-full text-md  mb-6">
                    Service Details
                  </p>
                  <p className="text-[#0A2472]   w-full text-sm  mb-3">
                    {selectedSession.time
                      ? `${appointments[0]?.service?.title} ${formattedDate}, at ${selectedSession.time}`
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
          <h1 className="text-3xl">This service is not available</h1>
        </div>
      )}
    </div>
  );
};

export default Booking;
