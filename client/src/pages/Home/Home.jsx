import { useNavigate } from "react-router";
//import HeroImg from "../../assets/images/heroPet.webp";
import CarouselDefault from "../../components/Carousel";
import ImageHome from "../../components/ImageHome";
import Testimonial from "../../components/Testimonial";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen ">
      <div className="md:flex flex-col  bg-[#94dbeb]">
        <div className="max-w-[500px] md:absolute top-[180px] md:top-[150px] left-[30px] block m-[20px] z-50">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#0A2472] font-bold md:mt-0 mt-[70px] lg:mt-[40px]">
            The Best Pet Groomers in Town
          </h1>
          <p className="text-[#0A2472] font-semibold mt-6 text-2xl ml-1">
            For a pawfect look and feel
          </p>
        </div>
        <img
          className="md:pt-[220px] md:pl-[150px] md:ml-auto  relative z-10 rounded-full"
          src="https://static.wixstatic.com/media/84770f_cc7fbf222d044cf09028f921a0cfe36e~mv2.png/v1/fill/w_1163,h_699,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/shutterstock_184908566%20copy.png"
          alt=""
        ></img>
      </div>
      <div className="bg-white w-full h-[140px] relative lg:top-[-120px] md:top-[-80px] sm:top-[-70px] top-[-50px] ">
        <div className="flex justify-center items-center flex-col w-full bg-white">
          <h1 className="md:text-6xl sm:text-5xl text-[#0A2472] max-w-[700px] px-6 font-bold  mt-[70px] bg-white relative top-[-20px] md:pt-[150px] pt-14 md:top-[0px] z-0 text-center  text-5xl">
            Your pet deserves to be pampered!
          </h1>
          <div className="flex justify-center items-center gap-12 mt-[50px] md:flex-row flex-col">
            <span className="flex justify-center items-center text-xl text-blue-900 gap-2">
              <span className="material-symbols-outlined text-5xl">shower</span>
              <span>Bath or Shower</span>
            </span>
            <span className="flex justify-center items-center text-blue-900 text-xl gap-2">
              <span className="material-symbols-outlined text-4xl">pets</span>
              <span>Hands-On Pet Assessment</span>
            </span>
            <span className="flex justify-center items-center text-blue-900 gap-2 text-xl">
              <i className="ri-windy-fill text-4xl"></i>
              <span>Safe Drying</span>
            </span>
          </div>
          <div className="mt-[60px] mb-[50px] ">
            <button
              type="button"
              className="text-white hover:bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full lg:text-xl px-8 py-2 text-center ease-linear duration-300 text-lg bg-purple-800 mb-[70px]"
              onClick={() => navigate("/services")}
            >
              Book an Appointment
            </button>
          </div>
          <div className="mb-16 hidden md:block">
            <ImageHome></ImageHome>
          </div>
          <div className="mb-16 block md:hidden h-[300px] md:h-[350px] lg:h-[400px] w-full px-[10px]  md:px-[100px] lg:px-[150px] xl:px-[250px] ">
            <CarouselDefault></CarouselDefault>
          </div>
        </div>
      </div>
      <div
        className="w-full flex
      flex-col justify-center items-center bg-light-blue-100 mt-[540px] md:mt-[350px]"
      >
        <h1 className="md:text-6xl sm:text-5xl text-[#0A2472] max-w-[700px] px-6 font-bold  md:pt-[400px] md:mt-[70px]  mt-[450px]  text-center  text-5xl mb-[80px] ">
          What Our Happy Clients Say
        </h1>
        <div className="px-12  flex gap-8 flex-col sm:flex-row mb-28 flex-wrap justify-center items-center w-screen  mt-[40px] lg:px-[140px] sm:gap-5">
          <Testimonial></Testimonial>
        </div>
      </div>
      <div className="bg-[#0A2472] w-full ">
        <div className="flex justify-center items-center flex-col w-full bg-[#0A2472]">
          <h1 className="md:text-6xl sm:text-5xl text-white  max-w-[700px] px-6 font-bold  mt-[50px] bg-[#0A2472] relative md:pt-[120px] pt-14  z-0 text-center  text-5xl leading-[60px]">
            See All Our Glamorous Customers
          </h1>

          <div className="mt-[60px]">
            <button
              type="button"
              className="text-[#0A2472]  hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full  px-7 py-2 text-center ease-linear duration-300 text-md bg-white h-10 mb-[70px]"
            >
              Follow Us
            </button>
          </div>
          <div className="h-[300px] md:h-[350px] lg:h-[400px] w-full px-[10px] mb-[100px] md:px-[100px] lg:px-[150px] xl:px-[250px] ">
            <CarouselDefault></CarouselDefault>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
