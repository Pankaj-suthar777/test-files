import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import SocialsIcon from "../components/SocialsIcon";
import { BrandName, infoOfBusiness } from "../data/constant";

const currentYear = new Date().getFullYear();

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="flex bg-white w-full justify-between gap-8 px-8 flex-wrap pb-10 pt-12">
      <footer className="relative w-full">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
            <Typography variant="h5" className="mb-6">
              <div
                className="flex gap-2 text-xl justify-center items-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <span className="material-symbols-outlined md:text-4xl text-3xl">
                  pets
                </span>
                <h2>Ponto Pet</h2>
              </div>
            </Typography>
            <div className="grid grid-cols-2 justify-between gap-8">
              <ul>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-bold opacity-80"
                >
                  Address
                </Typography>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    color="gray"
                    className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                  >
                    {infoOfBusiness.Address}
                  </Typography>
                </li>
              </ul>
              <ul>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-bold opacity-80"
                >
                  Contact
                </Typography>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    color="gray"
                    className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                  >
                    {infoOfBusiness.email}
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    color="gray"
                    className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                  >
                    {infoOfBusiness.number}
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
            >
              &copy; {currentYear} <a href="/">{BrandName.BrandName}</a>. All
              Rights Reserved.
            </Typography>
            <SocialsIcon size="sm"></SocialsIcon>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
