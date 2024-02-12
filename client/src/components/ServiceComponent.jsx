import { useNavigate } from "react-router";
const ServiceComponent = ({ service }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white sm:flex-row flex flex-col justify-between  items-center px-12 py-6 sm:gap-0 gap-5">
      <h1 className=" w-full text-[#0A2472]  font-bold  text-2xl flex-1 text-center">
        {service.title}
      </h1>
      <div className="flex flex-col flex-1 text-center">
        <span className="text-blue-900">{service.duration}</span>
        <span className="text-blue-900">${service.price}</span>
      </div>

      <div className="flex-1 flex justify-center">
        <button
          type="button"
          className="bg-[#122e83]  hover:bg-[rgb(0,31,122)] focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full  px-7 py-2  ease-linear duration-300 text-md text-white h-10"
          onClick={() => navigate(`book/${service._id}`)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceComponent;
