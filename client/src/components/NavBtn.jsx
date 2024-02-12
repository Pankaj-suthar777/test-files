import { useNavigate } from "react-router-dom";

const NavBtn = ({ children, path }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="text-blue-700 hover:text-white bg-transparent hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full lg:text-xl px-7 py-2 text-center ease-linear duration-300 text-sm"
      onClick={() => navigate(path)}
    >
      {children}
    </button>
  );
};

export default NavBtn;
