import { ReactNode } from "react";
import Navbar from "../Navbar/Nav";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children, ...props }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main {...props}>{children}</main>
    </>
  );
}
