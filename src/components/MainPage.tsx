import { useEffect, useState, useRef, useContext, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";

import { firebaseApp, auth } from "../firegase-config";
import { gameBgmContext } from "../Context";
import "../style/App.css";

type KeyframeType = {
  [key: string]: string | number;
};
//css 타입
interface AnimationType {
  delay: number;
  duration: number;
  easing: string;
  iterations: number;
}

type Action = {
  type: string;
  payload: ScoreType;
};
//데이터 타입
interface ScoreType {
  uid?: string;
  scoreCount: number;
  nicName: string;
}

const initial: ScoreType[] = [
  {
    uid: "",
    scoreCount: 0,
    nicName: "",
  },
];
function reducer(state: ScoreType[], action: Action) {
  switch (action.type) {
    case "CREATE": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}

const MainPage = () => {
  const [userScore, dispatch] = useReducer(reducer, initial);
  console.log(userScore);
  const { sound, userCollection, loginUser, stepValue } =
    useContext(gameBgmContext);
  //점수
  const [score, SetScore] = useState<number>(0);
  //이미지
  const [imgUrl, setImgUrl] = useState<string[][]>([]);
  //시간초
  const [time, setTime] = useState<number>(10);

  const location = useLocation();
  const stateNicName = location.state?.nicName;
  const navigation = useNavigate();

  const imgRefs = useRef<Array<HTMLImageElement | null>>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const divImgRef = useRef<HTMLDivElement>(null);
  const imgDivRefs = useRef<Array<HTMLDivElement | null>>([]);

  const loginUserDoc = doc(userCollection, loginUser);
  const loginUserScore = collection(loginUserDoc, stepValue.stepName);

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 671,
    y: 310,
  });
  // console.log(position);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const hadnleUserScore = async () => {
    try {
      const newScore = {
        uid: loginUser,
        scoreCount: score,
        nicName: stateNicName,
        step: stepValue.stepName,
      };

      dispatch({
        type: "CREATE",
        payload: newScore,
      });
      await setDoc(doc(loginUserScore, loginUser), newScore);

      if (sound) {
        sound.stop();
      }

      navigation(`/rank`);
    } catch (error) {
      console.log(error);
    }
  };

  const animateImage = (
    index: number,
    keyframes: KeyframeType[],
    options: AnimationType
  ) => {
    if (imgRefs.current && imgRefs.current[index]) {
      const blockImg3 = imgRefs.current[index];
      blockImg3?.animate(keyframes, options);
    } else {
      console.log("이미지 애니메이션 에러");
    }
  };

  function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i++) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }

  //이미지 관련
  useEffect(() => {
    const imgData = async () => {
      const storage = getStorage(firebaseApp);
      try {
        const imageRef = ref(storage, `img/`);
        const response = await listAll(imageRef);

        const downloadURLPromises = response.items.map((item) =>
          getDownloadURL(item)
        );

        const urls = await Promise.all(downloadURLPromises);
        const urlChunks = splitArrayIntoChunks(urls, 10);
        console.log(urlChunks);

        const showRandomImages = () => {
          if (urls.length === 0) return;

          const randomImages = [];

          for (let i = 0; i < 10; i++) {
            if (urls.length === 0) break;

            const index = Math.floor(Math.random() * urls.length);
            randomImages.push(urls[index]);
            urls.splice(index, 1);
          }
          setImgUrl(urlChunks);
        };
        showRandomImages();

        const interval = setInterval(() => {
          showRandomImages();
          if (urls.length === 0) clearInterval(interval);
        }, 10000);
        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error getting download URLs:", error);
      }
    };
    imgData();
  }, []);

  //이미지 css
  const startAnimation = () => {
    Promise.all(
      imgUrl.map((_, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve();
          };
          img.src = imgUrl[index];
        });
      })
    ).then(() => {
      imgUrl.forEach((_, index) => {
        const ramdom = Math.floor(Math.random() * 5);
        const keyframes = [
          { opacity: 0.9, transform: `translateX(${ramdom * 10}px)` },
          { opacity: 1, transform: `translate(${ramdom * 10}px, 800px)` },
        ];
        const options: AnimationType = {
          delay: ramdom * 500, //몇초동안 대기 후 시작
          duration: 10000, //몇초동안 지속
          easing: "ease-in", //감속 조절
          iterations: 1, //반복 횟수
        };

        animateImage(index, keyframes, options);
      });
    });
  };

  useEffect(() => {
    if (imgUrl.length) {
      startAnimation();
    }
  }, [imgUrl]);

  const handleImgClick = (index: number) => {
    const clickedImgRef = imgDivRefs.current[index];
    if (clickedImgRef) {
      clickedImgRef.classList.add("transparent_image");
      SetScore((prevScore) => prevScore + 1);
    }
  };

  //시간초
  useEffect(() => {
    const count = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(count);
      setTimeout(() => {
        divRef.current?.classList.remove("hidden");
        divRef.current?.classList.add("block");
      }, 2000);
    }
    return () => clearInterval(count);
  }, [time]);

  const handleStart = () => {
    auth.signOut();
    if (sound) {
      sound.stop();
    }
    navigation(`/`);
  };

  return (
    <article className="main_article">
      <section className="main_game_page">
        <div className="text-center p-4 ">
          <h1 className="text-2xl">{time}</h1>
          <div className="text-lg mt-1.5">{score}</div>
        </div>

        <div className="relative flex p-2.5 h-[65vh] overflow-hidden">
          {imgUrl.map((item, index) => (
            <div
              key={index}
              className="w-16 h-16"
              onClick={() => handleImgClick(index)}
              ref={(ref) => (imgDivRefs.current[index] = ref)}
            >
              <img
                key={index}
                ref={(element) => (imgRefs.current[index] = element)}
                id={`imgMove${index}`}
                className="w-16 h-16"
                src={item}
                alt="고양이 이미지"
                style={{ opacity: "0" }}
              />
            </div>
          ))}
        </div>
        <div className="bg-stone-400 h-32"></div>
        <div className="flex items-center justify-center">
          <div ref={divRef} className="hidden pop">
            <div className="text-center mt-10">
              <h5 className="mb-2.5">{stateNicName}님</h5>
              <h3> {score}점</h3>
            </div>
            <div className="flex flex-row gap-2.5 justify-center mt-9">
              <button
                className="btn_box bg-[url('/public/home.png')]"
                onClick={handleStart}
              ></button>
              <button
                className="btn_box bg-[url('/public/rank.png')]"
                onClick={hadnleUserScore}
              ></button>
            </div>
          </div>
        </div>
        {stepValue.stepName === "easy" && (
          <div
            ref={divImgRef}
            id="easy"
            className="mouse_event"
            style={{
              top: `${position.y}px`,
              left: `${position.x}px`,
            }}
          >
            <img src="/gfood-iconm.png" />
          </div>
        )}
        {stepValue.stepName === "normal" && (
          <div
            ref={divImgRef}
            id="normal"
            className="mouse_event"
            style={{
              top: `${position.y}px`,
              left: `${position.x}px`,
            }}
          >
            <img src="/bfood-iconm.png" alt="Normal Food" />
          </div>
        )}
        {stepValue.stepName === "hard" && (
          <div
            ref={divImgRef}
            id="hard"
            className="mouse_event"
            style={{
              top: `${position.y}px`,
              left: `${position.x}px`,
            }}
          >
            <img src="/rfood-iconm.png" alt="Hard Food" />
          </div>
        )}
        {/* 이미지 저작권 Copyright */}
        <div className="hidden">
          이미지 저작권 Copyright
          https://kr.freepik.com/icon/idea_763787#fromView=resource_detail&position=3
          https://kr.freepik.com/icon/kitty_763755#fromView=resource_detail&position=34
          https://kr.freepik.com/icon/kitty_763775#fromView=resource_detail&position=15
          https://kr.freepik.com/icon/kitty_763780#fromView=resource_detail&position=10
          https://kr.freepik.com/icon/kitty_763773#fromView=resource_detail&position=16
          https://kr.freepik.com/icon/kitty_763782#fromView=resource_detail&position=8
          https://kr.freepik.com/icon/kitty_763756#fromView=resource_detail&position=33
          https://kr.freepik.com/icon/kitty_763761#fromView=resource_detail&position=29
          https://kr.freepik.com/icon/kitty_763767#fromView=resource_detail&position=23
          https://kr.freepik.com/icon/kitty_763789#fromView=resource_detail&position=1
          https://kr.freepik.com/icon/kitty_763741#fromView=resource_detail&position=48
          https://kr.freepik.com/icon/kitty_763786#fromView=resource_detail&position=4
          https://kr.freepik.com/icon/fish-food_2334291#fromView=search&term=%EA%B3%A0%EC%96%91%EC%9D%B4+%EC%82%AC%EB%A3%8C&track=ais&page=2&position=67&uuid=8f5aec8d-7505-40ed-8d9a-fe52abd97d68
        </div>
      </section>
    </article>
  );
};

export default MainPage;
