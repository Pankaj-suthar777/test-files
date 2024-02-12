import { Card, Chip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { GetUserBookedAppointment } from "../apicalls/appointment";

const TABLE_HEAD = ["Service", "Date And Time", "Email", "Paid"];

export function Appointment() {
  const [appointments, setAppointments] = useState([]);

  async function getData() {
    const res = await GetUserBookedAppointment();
    if (res.success) {
      setAppointments(res.data);
    }
    console.log(res);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {appointment.serviceTitle}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {appointment.availabilityData}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {appointment.email}
                </Typography>
              </td>
              <td className="p-4">
                <div className="flex-1 flex justify-start items-center">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
