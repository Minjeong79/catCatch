import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { gameBgmContext } from "../Context";

const StartPage = () => {
  const { sigAanonymous, steps } = useContext(gameBgmContext);
  const navigation = useNavigate();

  const [audioCat] = useState(new Audio("/catSound.mp3"));

  const handleSignInAnonymous = (e: React.MouseEvent<HTMLDivElement>) => {
    const buttonId = (e.target as HTMLDivElement).id;
    if ("gFood" === buttonId) {
      sigAanonymous();
      steps("easy", 9);
    } else if ("bFood" === buttonId) {
      sigAanonymous();
      steps("normal", 7);
    } else {
      sigAanonymous();
      steps("hard", 5);
    }
    audioCat.play();
    navigation(`/login`);
  };

  return (
    <article className="main_article">
      <section className="icon bg-[url('/public/bg.png')] bg-cover w-full h-screen relative">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex items-center justify-center w-full h-2/5">
            <h1 className="bg-[url('/public/logo.png')] bg-no-repeat h-screen w-96 bg-center bg-no-repeat bg-cotain h-[80%]"></h1>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-[url('/public/cat_center.png')] bg-no-repeat bg-contain w-20 h-20"></div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-3 text-center cursor-pointer">
            <div>
              <div
                id="gFood"
                className="w-16 h-16 bg-[url('/public/gfood-icon.png')] bg-no-repeat bg-cover hover:rotate-45"
                onClick={handleSignInAnonymous}
              ></div>
              <span>Easy</span>
            </div>
            <div>
              <div
                id="bFood"
                className="w-16 h-16 bg-[url('/public/bfood-icon.png')] bg-no-repeat bg-cover hover:rotate-45"
                onClick={handleSignInAnonymous}
              ></div>
              <span>Normal</span>
            </div>
            <div>
              <div
                id="rFood"
                className="w-16 h-16 bg-[url('/public/rfood-icon.png')] bg-no-repeat bg-cover hover:rotate-45"
                onClick={handleSignInAnonymous}
              ></div>
              <span>Hard</span>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default StartPage;
