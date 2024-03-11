import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main>{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
