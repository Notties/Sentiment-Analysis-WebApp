import useComponentVisible from "@/src/hooks/useComponentVisible";
import {
  DownOutlined,
  GoogleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Divider, Dropdown, MenuProps, Row, Space } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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

  const { data: session } = useSession();

  const [loadings, setLoadings] = useState<boolean>(false);

  const items: MenuProps["items"] = [
    {
      label: (
        <div onClick={() => signOut()}>
          <Row align={"middle"} gutter={3}>
            <p className="mr-2">Sign out</p>
            <LogoutOutlined />
          </Row>
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <nav
        className="bg-blue-0  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 px-2 sm:px-4 py-2.5 border-b-2 border-gray-100"
        ref={ref}
      >
        <div className="container flex flex-wrap items-center justify-between mx-auto ">
          <Link href="/" className="flex items-center">
            <img
              src="logo.png"
              className="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <span
              className="self-center text-sm md:text-lg font-semibold whitespace-nowrap 
            bg-gradient-to-r from-blue-400 to-pink-400 inline-block text-transparent bg-clip-text"
            >
              Sentiment Analysis
            </span>
          </Link>

          <div className="flex md:order-2">
            <>
              <Space>
                {session && session.user ? (
                  <>
                    <Dropdown.Button
                      icon={
                        <ion-icon
                          name="chevron-down-outline"
                          class="mt-1"
                        ></ion-icon>
                      }
                      loading={loadings}
                      menu={{ items }}
                    >
                      <Row align={"middle"}>
                        <Image
                          src={`${session.user.image}`}
                          alt=""
                          width="0"
                          height="0"
                          className="w-5 h-5 mr-2 ml-0 mt-0 max-[450px]:mr-0 rounded-full"
                        />
                        <div className="max-[450px]:hidden">
                          {session.user.name}
                        </div>
                      </Row>
                    </Dropdown.Button>
                  </>
                ) : (
                  <Button onClick={() => signIn("google")}>
                    <Row align={"middle"}>
                      <Image
                        src="https://img.icons8.com/fluency/256/google-logo.png"
                        alt="google"
                        width="0"
                        height="0"
                        className="w-4 h-4 mr-2 ml-0 mt-0"
                      />
                      Sign in
                    </Row>
                  </Button>
                )}

                {/* Mobile burger */}
                <button
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden 
                hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
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
              </Space>
            </>
          </div>

          {(isMenuOpen && isComponentVisible) ||
          (!isMenuOpen && isComponentVisible) ? (
            /* Mobile View */
            <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 ">
              <ul
                className="flex flex-col p-4 mt-4 border border-gray-200 rounded-lg bg-gray-50 
              md:flex-row 
              md:space-x-8 
              md:mt-0 
              md:text-sm 
              md:font-medium 
              md:border-0 
              md:bg-white"
              >
                <li>
                  <Link
                    href="/"
                    className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 hover:text-gray-500"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/apidocs"
                    className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 hover:text-gray-500"
                  >
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            /* Desktop View */
            <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 ">
              <ul className="hidden md:flex md:p-4 md:flex-row md:space-x-8 md:mt-0">
                <li>
                  <Link
                    href="/"
                    className="block py-2 pl-3 pr-4 text-gray-500 rounded duration-700
                  md:hover:bg-transparent 
                md:hover:text-blue-500 
                  md:p-0 "
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/apidocs"
                    className="block py-2 pl-3 pr-4 text-gray-500 rounded duration-700
                  md:hover:bg-transparent 
                md:hover:text-blue-500 
                  md:p-0 "
                  >
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
