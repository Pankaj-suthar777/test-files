import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { SetToast } from "../redux/toastSlice";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { EmailJS } from "../data/constant";

const ContactUsForm = () => {
  const form = useRef();
  const dispatch = useDispatch();

  const sendEmail = (e) => {
    e.preventDefault();
    dispatch(SetLoader(true));
    emailjs
      .sendForm(
        EmailJS.Service_id,
        EmailJS.Template_id,
        form.current,
        EmailJS.Public_key
      )
      .then(
        (result) => {
          dispatch(SetLoader(false));
          console.log(result.text);
          dispatch(
            SetToast({
              open: true,
              message: "Message Sent Successfully",
              type: "success",
            })
          );
          console.log("message sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <section className="bg-[#94dbeb] ">
        <div className="py-8 lg:py-16  px-4 mx-auto max-w-screen-md">
          <p className="mb-8 lg:mb-16 font-light text-center text-[#233f92] sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form className="space-y-8" ref={form} onSubmit={sendEmail}>
            <div>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="filled"
                className="w-full"
                name="user_name"
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="filled"
                name="user_email"
                className="w-full"
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Address"
                variant="filled"
                className="w-full"
                name="address"
              />
            </div>
            <div>
              <TextField
                id="standard-multiline-static"
                label="Message"
                multiline
                maxRows={9}
                variant="filled"
                name="message"
                className="w-full h-full outline-none border-0 "
              />
            </div>

            <Button variant="outlined" type="submit">
              Send message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUsForm;
