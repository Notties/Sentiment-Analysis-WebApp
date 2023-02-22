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
          <title>Metaversus</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://stijndv.com/fonts/Eudoxus-Sans.css"
          />
        </Head>
      <Navbar />
      <main {...props}>{children}</main>
    </>
  );
}
