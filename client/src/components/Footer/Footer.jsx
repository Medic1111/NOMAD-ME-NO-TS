// import classes from "./Footer.module.css";
import React from "react";

const Footer = () => {
  return (
    <footer className={"w-full flex items-center justify-center h-[5vh] mt-5"}>
      <small className={"capitalize"}>
        Medic1111 {new Date().getFullYear()} Copyrights
      </small>
    </footer>
  );
};

export default React.memo(Footer);
