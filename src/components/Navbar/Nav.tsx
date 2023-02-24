import useComponentVisible from "@/src/hooks/useComponentVisible";
import { GoogleOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <>
      <nav
        className="bg-blue-0  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border-gray-100 px-2 sm:px-4 py-2.5"
        ref={ref}
      >
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <img
              src="logo.png"
              className="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-sm md:text-lg font-semibold whitespace-nowrap dark:text-gray-500">
              Sentiment Analysis
            </span>
          </Link>

          <div className="flex md:order-2">
            <Button className="mt-1 md:mt-0">
              <Row align={"middle"}>
                <img
                  src="https://img.icons8.com/fluency/256/google-logo.png"
                  alt="google"
                  className="w-4 h-4 mr-2 ml-0 mt-0"
                />
                Sign In
              </Row>
            </Button>

            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 ">
            <ul className="hidden md:flex md:p-4 md:flex-row md:space-x-8 md:mt-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 
                    md:hover:bg-transparent 
                    md:hover:text-blue-700 
                    md:p-0 
                    md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white 
                    md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/apidocs"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 
                    md:hover:bg-transparent 
                    md:hover:text-blue-700 
                    md:p-0 
                    md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white 
                    md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          {/* Mobile View */}
          {(isMenuOpen && isComponentVisible) ||
          (!isMenuOpen && isComponentVisible) ? (
            <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 ">
              <ul
                className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 
              md:flex-row 
              md:space-x-8 
              md:mt-0 
              md:text-sm 
              md:font-medium 
              md:border-0 
              md:bg-white dark:bg-gray-800 
              md:dark:bg-gray-900 dark:border-gray-700"
              >
                <li>
                  <Link
                    href="/"
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 
                    md:hover:bg-transparent 
                    md:hover:text-blue-700 
                    md:p-0 
                    md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white 
                    md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/apidocs"
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default Nav;
