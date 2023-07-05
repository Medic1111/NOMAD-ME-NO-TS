import HeroBtnBox from "../HeroBtnBox/HeroBtnBox";
import HeroTxtBox from "../HeroTxtBox/HeroTxtBox";

const HeroArticle = () => {
  return (
    <article className={`grow w-full flex flex-col items-center justify-start`}>
      <HeroTxtBox />
      <HeroBtnBox />
    </article>
  );
};

export default HeroArticle;
