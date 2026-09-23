import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthService from "../../appwrite/Autho";
import { logout } from "../../store/AuthSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await AuthService.logout();

      dispatch(logout());

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      className="inline-block rounded-lg px-6 py-2 duration-300 hover:bg-blue-200 text-white hover:text-black"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;