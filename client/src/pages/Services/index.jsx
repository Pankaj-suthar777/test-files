import { useEffect, useState } from "react";
import ServiceComponent from "../../components/ServiceComponent";
import { GetAllServices } from "../../apicalls/service";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const Services = () => {
  const [services, setServices] = useState([]);
  const dispatch = useDispatch();

  async function fetchData() {
    dispatch(SetLoader(true));
    const response = await GetAllServices();
    dispatch(SetLoader(false));
    if (response.success) {
      setServices(response.data);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-screen min-h-[50%] ">
      <div className="mt-14">
        <h1 className=" w-full text-[#0A2472]  font-thin text-center text-2xl ">
          Services
        </h1>
        <h1 className="text-[#233f92] px-16 text-center font-bold z-0 lg:text-6xl text-4xl leading-snug tracking-wide mt-4">
          We can't wait to see you!
        </h1>
      </div>

      <div className="flex flex-col px-12 gap-6 mt-16 mb-28">
        {services.map((service) => (
          <ServiceComponent
            service={service}
            key={service._id}
          ></ServiceComponent>
        ))}
      </div>
    </div>
  );
};

export default Services;
