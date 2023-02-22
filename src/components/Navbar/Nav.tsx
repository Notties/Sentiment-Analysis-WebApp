import Link from "next/link";
import { useState } from "react";
import NavLinks from "./Navlinks";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-white">
        <div className="flex items-center font-medium justify-around">
          <div className="z-50 p-2 md:w-auto w-full flex justify-between">
            <div>logo</div>
            <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
              <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
            </div>
          </div>
          <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
            <li>
              <Link href="/" className="py-7 px-3 inline-block">
                หน้าแรก
              </Link>
            </li>
            <NavLinks />
          </ul>
          <div className="md:block hidden">
            <h1>Button</h1>
          </div>
          {/* Mobile nav */}
          <ul
            className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
          >
            <li>
              <Link href="/" className="py-7 px-3 inline-block">
                หน้าแรก
              </Link>
            </li>
            <NavLinks />
            <div className="py-5">
              <h1>Button</h1>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
