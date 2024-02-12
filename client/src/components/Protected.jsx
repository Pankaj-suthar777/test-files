import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router";
import { SetUser } from "../redux/usersSlice";

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        console.log(response.data);
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    }
  }, []);
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
};

export default Protected;
