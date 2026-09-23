import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-y">
      <div className="mx-auto w-full max-w-7xl p-4 py-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              to="/"
              className="text-2xl font-bold"
            >
              Logo
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                Resources
              </h2>

              <ul className="text-gray-500">
                <li className="mb-3">
                  <Link to="/">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/all-posts">
                    All Posts
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>

              <ul className="text-gray-500">
                <li className="mb-3">
                  <a
                    href="https://github.com/sourav-07-s"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/sourav-sahoo-74088432b/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                Account
              </h2>

              <ul className="text-gray-500">
                <li className="mb-3">
                  <Link to="/login">
                    Login
                  </Link>
                </li>

                <li>
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            © 2026 ShopAssist. All Rights Reserved.
          </span>

          <a
            href="https://github.com/sourav-07-s"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-900"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}