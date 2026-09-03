import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-y">
      <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
        
        <div className="md:flex md:justify-between">

          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                className="mr-3 h-16"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Resources
              </h2>

              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>

              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>

                <li>
                  <a
                    href="https://linkedin.com/"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>

              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/privacy" className="hover:underline">
                    Privacy
                  </Link>
                </li>

                <li>
                  <Link to="/terms" className="hover:underline">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500">
            © 2026 ShopAssist. All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:justify-center sm:mt-0">
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

      </div>
    </footer>
  );
}