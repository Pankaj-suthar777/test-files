import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { GetBookedAppointment } from "../../apicalls/appointment";
import ViewModal from "./ViewModal";
import { SetDetails } from "../../redux/detailsSlice";
import { useDispatch } from "react-redux";

const TABLE_HEAD = [
  "Client Details",
  "Service",
  "isPaid",
  "appointment date and time",
  "details",
];

export function AdminAppointments() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  async function getData() {
    const res = await GetBookedAppointment();
    if (res.success) {
      setAllAppointments(res.data);
      console.log(res.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {open && <ViewModal open={open} setOpen={setOpen}></ViewModal>}
      <Card className="h-full w-full mt-5">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <Typography variant="h5">Appointments</Typography>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <div className="mt-4 w-full min-w-[800px]">
            <div className="flex flex-col">
              <div className="flex border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
                {TABLE_HEAD.map((head, index) => (
                  <div key={index} className="flex-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </div>
                ))}
              </div>
              <div>
                {allAppointments?.map((appointment, index) => (
                  <div
                    key={index}
                    className="flex border-b border-blue-gray-100 p-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar
                        src={appointment?.profilePicture}
                        alt=""
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-start"
                        >
                          {appointment?.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {appointment?.email}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex-1">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appointment.serviceTitle}
                      </Typography>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                      <div className="w-max">
                        <Chip
                          className="flex justify-center items-center"
                          variant="ghost"
                          value={
                            appointment.isPaid === true ? (
                              <i className="ri-check-double-line text-green-700"></i>
                            ) : (
                              <i className="ri-close-line"></i>
                            )
                          }
                          size="sm"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appointment.availabilityData}
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <div
                        onClick={() => {
                          setOpen(true);
                          dispatch(
                            SetDetails({
                              serviceTitle: appointment.serviceTitle,
                              availabilityData: appointment.availabilityData,
                              phone: appointment.phone,
                              message: appointment.message,
                              email: appointment.email,
                              name: appointment.name,
                            })
                          );
                        }}
                      >
                        <Chip
                          className="flex justify-center items-center cursor-pointer"
                          variant="outlined"
                          value={"view"}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
