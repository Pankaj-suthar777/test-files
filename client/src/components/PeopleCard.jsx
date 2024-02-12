import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { AboutUsProfileCard } from "../data/constant";

export function ProfileCard() {
  const navigate = useNavigate();
  return (
    <>
      {AboutUsProfileCard.map((card, index) => (
        <Card key={index} className="w-[280px] h-[440px] ">
          <CardHeader floated={false} className="h-[280px]">
            <img
              src={card.image}
              alt="profile-picture"
              className="object-cover h-full w-full"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {card.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {card.message}
            </Typography>
            <button
              type="button"
              className="bg-[#122e83]  hover:bg-[rgb(0,31,122)] focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full  px-7 py-2 text-center ease-linear duration-300 text-md text-white h-10 mt-4"
              onClick={() => navigate("/services")}
            >
              Follow Us
            </button>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
