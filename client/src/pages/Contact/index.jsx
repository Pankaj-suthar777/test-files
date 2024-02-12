import ContactUsForm from "../../components/ContactUsForm";
import SocialIcon from "../../components/SocialsIcon";

const index = () => {
  return (
    <div className="w-screen px-10 mt-28 mb-16">
      <h1 className=" w-full text-[#0A2472]  font-thin text-2xl mb-8">
        Get in touch
      </h1>
      <h1 className=" text-[#233f92] max-w-[850px]  font-bold z-0 lg:text-6xl sm:text-4xl text-3xl leading-snug tracking-wide mb-16">
        Call us, contact our team via the form below, or book your pet's
        appointment directly on the website.
      </h1>
      <ContactUsForm></ContactUsForm>
      <p className="mt-16 w-full text-[#0A2472]  font-thin  mb-2">
        123-456-7890, info@mysite.com
      </p>
      <p className=" w-full text-[#0A2472]  font-thin  mb-8">
        500 Terry Francine Street, San Francisco, CA 94158
      </p>
      <div className="flex pt-5">
        <SocialIcon size="md"></SocialIcon>
      </div>
    </div>
  );
};

export default index;
