import { Button } from "@mui/material";
import { EditUserProfile, UploadUserImage } from "../apicalls/users";
import { useState } from "react";
import { SetToast } from "../redux/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { Spinner } from "@material-tailwind/react";

const ImageUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null); // Initialize file state to null

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!file) {
        // Check if a file is selected
        throw new Error("Please select a file.");
      }
      const formData = new FormData(); // Create FormData object
      formData.append("file", file); // Append the file to FormData
      const res = await UploadUserImage(formData); // Upload the file
      setIsLoading(false);
      console.log(res.data);
      await EditUserProfile(user._id, {
        profilePicture: res.data,
      });

      if (res.success) {
        dispatch(
          SetToast({
            open: true,
            message: "Image upload successfully",
            type: "success",
          })
        );

        dispatch(SetUser({ ...user, profilePicture: res.data }));
      }
    } catch (error) {
      dispatch(
        SetToast({
          open: true,
          message: error.message,
          type: "warning",
        })
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="py-4 px-3">
      <form onSubmit={handleSubmit}>
        <h1 className="text-lg font-semibold px-2 py-2">
          Upload Profile Image
        </h1>
        <div className="flex items-center justify-center w-full mb-8">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              className="max-h-[330px] max-w-[330px] object-cover"
              alt="Uploaded Profile"
            />
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                ></svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])} // Set file state when file is selected
              />
            </label>
          )}
        </div>
        {isLoading && (
          <div className="w-full flex mb-7 justify-center items-center">
            <Spinner className="h-12 w-12" />{" "}
          </div>
        )}
        <Button className="w-full " variant="contained" type="submit">
          Upload image
        </Button>
        {file && (
          <div className="w-full mt-3">
            <label htmlFor="change-image" className="w-full mt-5">
              <Button variant="contained" component="span" className="w-full">
                Change Image
              </Button>
              <input
                id="change-image"
                type="file"
                className="mt-5 h-full w-full hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
        )}
      </form>
    </div>
  );
};

export default ImageUpload;
