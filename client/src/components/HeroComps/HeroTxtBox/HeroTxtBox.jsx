// import classes from "./HeroTxtBox.module.css";
import React from "react";
import { Slide } from "react-awesome-reveal";

const HeroTxtBox = () => {
  return (
    <React.Fragment>
      <h2
        className={
          "my-5 md:py-10 max-w-[90%] md:max-w-[70%] text-5xl text-center text-cyan-950"
        }
      >
        Welcome Wanderer!
      </h2>
      <Slide cascade className={`p-5 my-3 flex items-center justify-center`}>
        <p className={"text-2xl text-center  max-w-[90%] md:max-w-[70%]"}>
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
