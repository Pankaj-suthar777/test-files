import React from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Chip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { BrandName } from "../data/constant";

const HamNav = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  return (
    <React.Fragment>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            {BrandName.BrandName}
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          <ListItem>
            {user == null ? (
              <div className="flex  w-full">
                <button
                  className=" text-white bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-7 py-2 text-center ease-linear duration-300"
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                >
                  <div className="flex justify-center items-center gap-2 ">
                    <span className="material-symbols-outlined">
                      account_circle
                    </span>

                    <span>Log in</span>
                  </div>
                </button>
              </div>
            ) : (
              <div
                className="flex w-full"
                onClick={() => {
                  if (user.role === "user") {
                    navigate("/profile");
                  } else if (user.role === "admin") {
                    navigate("/profile-admin");
                  }
                  setIsOpen(false);
                }}
              >
                <div className="flex justify-center items-center gap-3 cursor-pointer">
                  <img
                    alt="tania andrew"
                    src={user.profilePicture}
                    className="relative inline-block object-cover object-center w-10 h-10 rounded-full cursor-pointer"
                    data-popover-target="profile-menu"
                  />
                  <span className="uppercase">{user.name}</span>
                </div>
              </div>
            )}
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            <ListItemPrefix>
              <i className="ri-home-2-line"></i>
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/services");
              setIsOpen(false);
            }}
          >
            <ListItemPrefix>
              <i className="ri-customer-service-line"></i>
            </ListItemPrefix>
            Services
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/About");
              setIsOpen(false);
            }}
          >
            <ListItemPrefix>
              <i className="ri-information-line"></i>
            </ListItemPrefix>
            About
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/contact");
              setIsOpen(false);
            }}
          >
            <ListItemPrefix>
              <i className="ri-contacts-line"></i>
            </ListItemPrefix>
            Contact
          </ListItem>
          {user && (
            <ListItem
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(SetUser(null));
                navigate("/login");
                setIsOpen(false);
              }}
            >
              <ListItemPrefix>
                <i className="ri-logout-box-line"></i>
              </ListItemPrefix>
              Logout
            </ListItem>
          )}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default HamNav;
