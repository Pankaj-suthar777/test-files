import React from "react";

const ImageHome = () => {
  return (
    <div className="flex gap-4 px-[50px] xl:px-[150px]  md:px-[50px]  w-full justify-center items-center">
      <div className="relative  overflow-hidden bg-cover bg-no-repeat">
        <img
          src="https://media.istockphoto.com/id/1353103534/photo/veterinarian-examining-cute-pug-dog-and-cat-in-clinic-closeup-vaccination-day.jpg?s=2048x2048&w=is&k=20&c=Vazu5x43Fn1EXYVZKySeRBeTkkskpI-KzismEXXuGiY="
          className=" transition duration-300 ease-in-out hover:scale-110 rounded-xl"
          alt="Louvre"
        />
      </div>
      <div className="relative   overflow-hidden bg-cover bg-no-repeat">
        <img
          src="https://media.istockphoto.com/id/1152275532/photo/cat-vaccination.jpg?s=2048x2048&w=is&k=20&c=ABdFc32G5bklU7nbqZ_plTDON577X_TvWyPJ_aMypxA="
          className=" transition duration-300 ease-in-out hover:scale-110 rounded-xl w-full"
          alt="Louvre"
        />
      </div>
      <div className="relative  overflow-hidden bg-cover bg-no-repeat">
        <img
          src="https://media.istockphoto.com/id/1356845507/photo/veterinary-clinic.jpg?s=2048x2048&w=is&k=20&c=XgLcrZ-tkccZ8yYwaxt_b_-o-feVUkzt6_4xcN5mbEM="
          className=" transition duration-300 ease-in-out hover:scale-110 rounded-xl w-full"
          alt="Louvre"
        />
      </div>
      <div className="relative  overflow-hidden bg-cover bg-no-repeat">
        <img
          src="https://media.istockphoto.com/id/1391737847/photo/veterinary-placing-a-catheter-via-a-cat-in-the-clinic.jpg?s=2048x2048&w=is&k=20&c=Qmi5G1D5W1tsFOwTenfE-9eu2Zl-hWn2aVvlap63xBE="
          className=" transition duration-300 ease-in-out hover:scale-110 rounded-xl w-full"
          alt="Louvre"
        />
      </div>
    </div>
  );
};

export default ImageHome;
