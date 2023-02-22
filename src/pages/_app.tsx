import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/layout";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";

import { JSX as LocalJSX } from "@ionic/core";
import { JSX as IoniconsJSX } from "ionicons";
import { HTMLAttributes, ReactText } from "react";

type ToReact<T> = {
  [P in keyof T]?: T[P] &
    Omit<HTMLAttributes<Element>, "className"> & {
      class?: string;
      key?: ReactText;
    };
};

declare global {
  export namespace JSX {
    interface IntrinsicElements
      extends ToReact<
        LocalJSX.IntrinsicElements & IoniconsJSX.IntrinsicElements
      > {}
  }
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
