import React from "react";
import Header from "../common/Header";
import NextTopLoader from "nextjs-toploader";

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
    </>
  );
};

export default SimpleLayout;
