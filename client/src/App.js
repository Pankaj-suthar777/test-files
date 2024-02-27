import Home from "./pages/Home/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Toast from "./components/Toast";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import Booking from "./pages/Booking/Booking";
import CheckOutDeatilsForm from "./pages/CheckOutDeatilsForm/CheckOutDeatilsForm";
/* eslint-disable-next-line padded-blocks */

import ErrorPage from "./pages/ErrorPage/Error";
import SuccessPage from "./pages/SuccessPage/Success";

function App() {
  const currentURL = window.location.href;
  console.log("Current URL:", currentURL);
  const toasts = useSelector((state) => state.toasts);
  const loaders = useSelector((state) => state.loaders);

  return (
    <>
      {toasts.open && <Toast toasts={toasts}></Toast>}
      {loaders.loading && <Loader></Loader>}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home></Home>
              </Protected>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <Protected>
                <About></About>
              </Protected>
            }
          ></Route>
          <Route
            path="/services"
            element={
              <Protected>
                <Services></Services>
              </Protected>
            }
          ></Route>
          <Route
            path="/contact"
            element={
              <Protected>
                <Contact></Contact>
              </Protected>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Protected>
                <Login></Login>
              </Protected>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Protected>
                <Signup></Signup>
              </Protected>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile></Profile>
              </Protected>
            }
          ></Route>
          <Route
            path="/profile-admin"
            element={
              <Protected>
                <Admin></Admin>
              </Protected>
            }
          ></Route>
          <Route
            path="/services/book/:id"
            element={
              <Protected>
                <Booking></Booking>
              </Protected>
            }
          ></Route>

          <Route
            path="/services/book/:id/add-your-deatils/:sessionId"
            element={
              <Protected>
                <CheckOutDeatilsForm></CheckOutDeatilsForm>
              </Protected>
            }
          ></Route>
          <Route
            path="/success"
            element={
              <Protected>
                <SuccessPage></SuccessPage>
              </Protected>
            }
          ></Route>
          <Route
            path="/cancel"
            element={
              <Protected>
                <ErrorPage></ErrorPage>
              </Protected>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
