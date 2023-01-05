import classes from "./HeroParallax.module.css";
import { Zoom } from "react-awesome-reveal";
const HeroParallax = () => {
  return (
    <div className={`${classes.parallax} flex_center`}>
      <header className={`${classes.header}`}>
        <Zoom>
          <h1 className={classes.h1}>NOMAD ME</h1>
        </Zoom>
      </header>
    </div>
  );
};

export default HeroParallax;
