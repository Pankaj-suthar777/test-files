import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditProfileModal from "../Profile/EditProfileModal";
import { TabsAdmin } from "./TabsAdmin";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "user") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <main className="profile-page mt-20 ">
      <section className="relative py-16">
        <div
          className="fixed top-[-100px] w-full h-[1100px] z-[-777] bg-center bg-cover"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')`,
          }}
        ></div>

        <div className="container mx-auto sm:px-4 px-2">
          <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative h-40 w-40 flex justify-center lg:pl-0 pl-[1rem]">
                    <img
                      alt="..."
                      src={user?.profilePicture}
                      className="shadow-xl rounded-full  align-middle border-none absolute object-cover -m-16 -ml-20 lg:-ml-16 w-full h-full"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div
                    className="py-6 px-3 mt-32 lg:inline-block
                  hidden sm:mt-0"
                  >
                    <Button
                      variant="contained"
                      type="button"
                      onClick={() => setOpen(true)}
                    >
                      <i className="ri-edit-box-line"></i>
                      Edit profile
                    </Button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  {/* <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Comments
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="text-center relative md:top-[-20px] top-[-40px]">
                <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2">
                  {user?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold flex justify-center items-center">
                  <i className="ri-mail-line mr-2 text-lg text-blueGray-400"></i>
                  {user?.email}
                </div>
                <div className="w-full flex justify-center lg:hidden mt-5">
                  <Button
                    variant="contained"
                    type="button"
                    onClick={() => setOpen(true)}
                  >
                    <i className="ri-edit-box-line"></i>
                    Edit profile
                  </Button>
                </div>
                {/* <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div> */}
              </div>
              <div className="md:mt-10  mt-5 py-5 md:py-10 border-t border-blueGray-200 text-center">
                <TabsAdmin></TabsAdmin>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EditProfileModal open={open} setOpen={setOpen}></EditProfileModal>
    </main>
  );
};

export default Profile;
