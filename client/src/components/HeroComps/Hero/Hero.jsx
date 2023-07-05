import React from "react";
import HeroParallax from "../HeroParallax/HeroParallax";
import HeroArticle from "../HeroArticle/HeroArticle";

const Hero = () => {
  return (
    <div className="w-screen h-auto">
      <HeroParallax />
      <HeroArticle />
    </div>
  );
};

export default React.memo(Hero);
