import classes from "./SwipeAnim.module.css";
import { Slide, Bounce } from "react-awesome-reveal";
const SwipeAnim = () => {
  return (
    <Slide delay={2500} direction="right" className={classes.slide}>
      <Bounce className={`${classes.swipe} material-symbols-outlined`}>
        swipe
      </Bounce>
    </Slide>
  );
};

export default SwipeAnim;
