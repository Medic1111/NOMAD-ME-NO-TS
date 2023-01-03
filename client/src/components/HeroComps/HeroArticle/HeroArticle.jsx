import classes from "./HeroArticle.module.css";
import HeroBtnBox from "../HeroBtnBox/HeroBtnBox";
import HeroTxtBox from "../HeroTxtBox/HeroTxtBox";

const HeroArticle = () => {
  return (
    <article className={`${classes.article} flex_col_center`}>
      <HeroTxtBox />
      <HeroBtnBox />
    </article>
  );
};

export default HeroArticle;
