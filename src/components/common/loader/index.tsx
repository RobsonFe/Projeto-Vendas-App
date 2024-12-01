import React from "react";
import "./index.css";


export const Loader: React.FC = () => {
  // return (
  //   <div className="flex h-screen items-center justify-center bg-white/15 dark:bg-black">
  //     <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
  //   </div>
  // );

  return (
        <div className="lds-ring ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
  );
};
