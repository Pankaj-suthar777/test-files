import sideImg from "../../assets/images/side-pet.webp";
import { ProfileCard } from "../../components/PeopleCard";
import { AboutUs, AboutUsProfileCardTitle } from "../../data/constant";

const index = () => {
  return (
    <div>
      <div className="mb-28">
        <div className="flex flex-col w-full sm:pl-12 pl-6 lg:mb-[120px] mb-[80px]">
          <h1 className="  text-[#0A2472] font-thin   mt-[120px] text-2xl mb-[30px]">
            About us
          </h1>
          <h1 className=" text-[#233f92] max-w-[900px]  font-bold z-0 lg:text-6xl sm:text-4xl text-3xl  leading-snug tracking-wide">
            At Ponto Pet, we put our love for pets and their owners into all
            that we do.
          </h1>
        </div>

        <div className="flex lg:flex-row flex-col  h-full w-screen">
          <div className=" justify-center items-center  w-full lg:hidden flex md:px-28 mb-12">
            <img
              alt=""
              src={sideImg}
              className="object-fill   w-full md:h-[800px] md:w-full"
            ></img>
          </div>
          <div className="max-w-[850px] h-full xl:px-14">
            <div className="justify-center flex-col xl:items-center items-start lg:h-[706px]  md:h-[400px] sm:h-[500px]  lg:flex    xl:mx-12 ml-6 pr-3">
              <h1 className="  text-[#0A2472]  font-thin  self-start   text-3xl mb-[30px]">
                Our Story
              </h1>
              <p className="text-[#0A2472] lg:text-lg text-md tracking-wider">
                {AboutUs.paragraph1}
              </p>
              <br></br>

              <p className="text-[#0A2472] lg:text-lg text-md tracking-wider">
                {AboutUs.paragraph2}
              </p>
              <br></br>

              <p className="text-[#0A2472] lg:text-lg text-md tracking-wider ">
                {AboutUs.paragraph3}
              </p>
            </div>
          </div>
          <div className="justify-end items-center h-[706px] w-full lg:flex hidden  mx-12 ">
            <img
              src={sideImg}
              className=" object-cover lg:max-w-[384px] min-w-[330px] h-[506px]  w-full"
            ></img>
          </div>
        </div>
      </div>

      {/* team */}
      <div className="w-screen h-full  bg-[#0A2472]">
        <h1 className=" text-white  font-bold z-0 text-6xl leading-snug tracking-wide text-center py-28 ">
          {AboutUsProfileCardTitle}
        </h1>
        <div className="flex gap-12 lg:gap-16 xl:gap-28 px-8 flex-wrap justify-center  pb-28">
          <ProfileCard></ProfileCard>
        </div>
      </div>
    </div>
  );
};

export default index;
