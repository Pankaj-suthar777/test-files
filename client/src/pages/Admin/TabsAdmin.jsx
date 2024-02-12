import { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AdminSideServiceComponent from "../../components/AdminSideServiceComponent";
import { Button } from "@mui/material";
import AddServiceModal from "./AddServiceModal";
import { UserList } from "../../components/UserList";
import { GetAllServices } from "../../apicalls/service";
import { AdminAppointments } from "./AdminAppointment";

export function TabsAdmin() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await GetAllServices();
      if (response.success) {
        setServices(response.data);
      }
    }
    fetchData();
  }, []);

  const data = [
    {
      label: "Services",
      value: "html",
      desc: (
        <div
          className="flex flex-col  gap-6 mt-10 mb-28"
          key={Math.floor(Math.random() * 234)}
        >
          <div className="flex justify-between sm:px-6 px-0">
            <h1 className=" text-[#0A2472] font-thin ml-1 sm:text-2xl  text-xl mt-1 sm:mt-0">
              Services
            </h1>
            <Button
              variant="outlined"
              className="flex justify-center items-center gap-3 "
              onClick={() => setOpen(true)}
            >
              <i className="ri-add-line text-xl"></i> Add Service
            </Button>
          </div>

          {services.map((service) => (
            <AdminSideServiceComponent
              serviceId={service._id}
              key={service._id}
              service={service}
              setServices={setServices}
              services={services}
            />
          ))}
        </div>
      ),
    },
    {
      label: "Appointments",
      value: "react",
      desc: <AdminAppointments></AdminAppointments>,
    },
    {
      label: "Users",
      value: "vue",
      desc: <UserList />,
    },
  ];

  return (
    <>
      {open && (
        <AddServiceModal
          open={open}
          setOpen={setOpen}
          setServices={setServices}
        />
      )}
      <Tabs value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="sm:text-lg text-sm">
              <div className="flex justify-center items-center sm:gap-3 gap-2">
                {label === "Services" ? (
                  <i className="ri-service-fill"></i>
                ) : label === "Appointments" ? (
                  <i className="ri-question-answer-line"></i>
                ) : (
                  <i className="ri-user-fill"></i>
                )}

                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="m-0 p-0 w-[100%]">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
}
