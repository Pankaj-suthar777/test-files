import { useState, useEffect } from "react";
import NavBtn from "../components/NavBtn";
import HamNav from "./HamNav";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Popover from "@mui/material/Popover";
import { List, ListItem } from "@material-tailwind/react";
import { SetUser } from "../redux/usersSlice";

import Box from "@mui/material/Box";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BrandName } from "../data/constant";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openPop, setOpenPop] = useState(false);
  const { user } = useSelector((state) => state.users);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the Popover
    const handleClickOutside = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handleClose();
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [anchorEl]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <nav className="w-screen bg-[#94dbeb] h-[70px] flex items-center justify-center ">
      <div className="flex w-full h-full justify-between items-center px-8 container max-w-[1200px]">
        {/*logo*/}
        <div
          className="flex gap-2 text-xl justify-center items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="material-symbols-outlined md:text-4xl text-3xl">
            pets
          </span>
          <h2>{BrandName.BrandName}</h2>
        </div>
        {/*navigations btns*/}
        <div className="hidden gap-2 justify-center items-center md:flex">
          <NavBtn path="/">Home</NavBtn>
          <NavBtn path="/services">Services</NavBtn>
          <NavBtn path="/about">About</NavBtn>
          <NavBtn path="/contact">Contact</NavBtn>
          {user === null ? (
            <Link to="/login">
              <div className="flex gap-2 items-center cursor-pointer p-2 rounded-2xl">
                <span className="material-symbols-outlined ">
                  account_circle
                </span>
                <span>Log in</span>
              </div>
            </Link>
          ) : (
            <>
              <div
                aria-describedby={id}
                onClick={handleClick}
                className="flex justify-center items-center  gap-3 cursor-pointer border border-gray-500 bg-[#c0d6df] rounded-lg px-2 py-2"
              >
                <img
                  alt="tania andrew"
                  src={user?.profilePicture}
                  className="relative inline-block object-cover object-center w-10 h-10 rounded-full cursor-pointer"
                  data-popover-target="profile-menu"
                  onClick={() => setOpenPop(!openPop)}
                />
                <span className="uppercase">{user?.name}</span>
              </div>{" "}
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <nav aria-label="main mailbox folders">
                    <List>
                      <ListItem
                        onClick={() => {
                          if (user?.role === "user") {
                            navigate("/profile");
                          } else {
                            navigate("/profile-admin");
                          }
                        }}
                      >
                        <ListItemIcon>
                          {" "}
                          <span className="material-symbols-outlined text-4xl">
                            account_circle
                          </span>{" "}
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItem>
                      <ListItem
                        onClick={() => {
                          localStorage.removeItem("token");
                          dispatch(SetUser(null));
                          navigate("/login");
                        }}
                      >
                        <ListItemIcon>
                          <i className="ri-logout-box-line text-4xl"></i>
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </nav>
                </Box>
              </Popover>
            </>
          )}
        </div>
        <span
          className="material-symbols-outlined text-3xl inline md:hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          menu
        </span>
        <HamNav isOpen={isOpen} setIsOpen={setIsOpen}></HamNav>
      </div>
    </nav>
  );
};

export default Navbar;
