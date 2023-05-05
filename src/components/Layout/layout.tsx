import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "../Navbar/Nav";

type LayoutProps = {
  children?: ReactNode;
};

  

export default function Layout({ children, ...props }: LayoutProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8"/>
      </Head>
      <Navbar />
      <main {...props}>{children}</main>
    </>
  );
}
