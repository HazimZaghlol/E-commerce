import React from "react";
import { Circles } from "react-loader-spinner";

export const Loading: React.FC = () => {
  return <Circles height="80" width="80" color="#13b9dd" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="justify-center" visible={true} />;
};
