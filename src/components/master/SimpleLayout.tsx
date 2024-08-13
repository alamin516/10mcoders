import React from "react";
import Header from "../common/Header";
import NextTopLoader from "nextjs-toploader";
import Footer from "../common/Footer";

type Props = {
  children: React.ReactNode;
};

const SimpleLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <NextTopLoader color="#20B15A" showSpinner={false} height={2} />
        {children}
      </div>
      <Footer/>
    </>
  );
};

export default SimpleLayout;
