import classes from "./Portal.module.css";
import React from "react";
import { createPortal } from "react-dom";

const root = document.getElementById("portal");

const Wrapper = ({ children }) => {
  return <article className={classes.wrapper}>{children}</article>;
};

const Portal = ({ children }) => {
  return (
    <React.Fragment>
      {createPortal(<Wrapper>{children}</Wrapper>, root)}
    </React.Fragment>
  );
};

export default Portal;
