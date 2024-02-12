import { useState } from "react";
import EditServiceModal from "../pages/Admin/EditServiceModal";
import AddServiceAvaibility from "../pages/Admin/AddServiceAvaibilityModal";
const AdminSideServiceComponent = ({
  service,
  setServices,
  services,
  serviceId,
}) => {
  const [openEditService, setOpenEditService] = useState(false);
  const [openAddServiceAvaibility, setOpenAddServiceAvaibility] =
    useState(false);
  return (
    <>
      {openAddServiceAvaibility && (
        <AddServiceAvaibility
          serviceId={serviceId}
          openAddServiceAvaibility={openAddServiceAvaibility}
          setOpenAddServiceAvaibility={setOpenAddServiceAvaibility}
        ></AddServiceAvaibility>
      )}
      {openEditService && (
        <EditServiceModal
          openEditService={openEditService}
          setOpenEditService={setOpenEditService}
          service={service}
          setServices={setServices}
          services={services}
        ></EditServiceModal>
      )}
      <div className="bg-white md:flex-row flex flex-col justify-between  items-center px-5 py-4 sm:gap-2 gap-5 border border-purple-900 rounded-xl">
        <h1 className=" w-full text-[#0A2472]  font-bold  text-2xl flex-1 text-center">
          {service?.title}
        </h1>
        <div className="flex flex-col flex-1 text-center">
          <span className="text-blue-900">{service?.duration}</span>
          <span className="text-blue-900">${service?.price}</span>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="flex gap-2 flex-col">
            <button
              type="button"
              className="bg-[#122e83] flex gap-2 justify-center items-center  hover:bg-[rgb(0,31,122)] focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full  px-7 py-2  ease-linear duration-300 text-md text-white h-10"
              onClick={() => setOpenEditService(true)}
            >
              <i className="ri-edit-box-line"></i>
              Edit
            </button>

            <button
              type="button"
              className="bg-[#122e83] flex gap-2 justify-center items-center  hover:bg-[rgb(0,31,122)] focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full  px-7 py-2  ease-linear duration-300 text-md text-white h-10"
              onClick={() => setOpenAddServiceAvaibility(true)}
            >
              <i className="ri-add-line"></i>
              Add availability
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideServiceComponent;
