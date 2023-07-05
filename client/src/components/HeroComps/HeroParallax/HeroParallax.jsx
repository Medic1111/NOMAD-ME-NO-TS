import classes from "./HeroParallax.module.css";
import { Zoom } from "react-awesome-reveal";
const HeroParallax = () => {
  return (
    <div
      className={`${classes.parallax}  flex items-center justify-center w-full mb-5 `}
    >
      <Zoom>
        <h1
          className={
            "w-full  text-center text-slate-800  text-8xl flex items-center justify-center"
          }
        >
          NOMAD ME
        </h1>
      </Zoom>
    </div>
  );
};

export default HeroParallax;
