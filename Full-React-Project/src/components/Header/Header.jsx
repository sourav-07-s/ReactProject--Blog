import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const authStatus = useSelector(
    (state) => state.auth.status
  );

  const navItem = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-800">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link
              to="/"
              className="font-extrabold text-white"
            >
              Logo
            </Link>
          </div>

          <ul className="flex ml-auto items-center">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="inline-block px-6 py-2 text-white duration-200 hover:bg-violet-300 hover:text-black rounded-lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};