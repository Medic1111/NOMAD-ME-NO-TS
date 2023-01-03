import React from "react";
import HeroParallax from "../HeroParallax/HeroParallax";
import HeroArticle from "../HeroArticle/HeroArticle";

const Hero = () => {
  return (
    <React.Fragment>
      <HeroParallax />
      <HeroArticle />
    </React.Fragment>
  );
};

export default React.memo(Hero);
