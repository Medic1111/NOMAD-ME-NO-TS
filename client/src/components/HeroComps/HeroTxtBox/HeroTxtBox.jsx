import React from "react";
import classes from "./HeroTxtBox.module.css";
import { Slide } from "react-awesome-reveal";

const HeroTxtBox = () => {
  return (
    <React.Fragment>
      <h2 className={classes.h2}>Welcome Wanderer!</h2>
      <Slide cascade className={`${classes.slide} flex_center`}>
        <p className={classes.p}>
          Are you a free-spirited, untamable individual, who simply won't stop
          until all that's there to be seen gets seen? You have found your
          place! Non-toxic community filled with people who love to unsettle and
          share their experiences!{" "}
        </p>
      </Slide>
    </React.Fragment>
  );
};

export default HeroTxtBox;
