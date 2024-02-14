import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, getDocs, collection, query, orderBy } from "firebase/firestore";
import { firebaseApp, auth } from "../firegase-config";
import { gameBgmContext } from "../Context";
import "../style/App.css";
interface ScoreType {
  uid?: string;
  scoreCount: number;
  nicName: string;
  step: string;
}
const initial: ScoreType[] = [
  {
    uid: "",
    scoreCount: 0,
    nicName: "",
    step: ",",
  },
];
const RankPage = () => {
  const { sound, userCollection, stepValue } = useContext(gameBgmContext);

  const [rank, setRank] = useState<ScoreType[]>(initial);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const navigation = useNavigate();

  const scoreDataList = async (x: string) => {
    console.log(x);
    try {
      const loginUserList = await getDocs(userCollection);

      // Promise.all을 사용하여 모든 프로미스가 해결될 때까지 기다림
      const updatedRank = await Promise.all(
        loginUserList.docs.map(async (item) => {
          const data = item.data();
          const loginUserDoc = doc(userCollection, data.uid);
          const loginUserScore = query(
            collection(loginUserDoc, stepValue.stepName),
            orderBy("scoreCount")
          );

          const loginUserScoreDoc = await getDocs(loginUserScore);

          // 프로미스 해결 후 반환하는 데이터
          return loginUserScoreDoc.docs.map((it) => it.data() as ScoreType);
        })
      );

      // updatedRank는 이제 Promise 배열이 아닌 ScoreType 배열
      setRank(updatedRank.flat());
    } catch (error) {
      console.error("Error fetching and updating data:", error);
    }
  };
  const handlescoreDataList = async (x: string) => {
    console.log(x);
    try {
      const loginUserList = await getDocs(userCollection);

      // Promise.all을 사용하여 모든 프로미스가 해결될 때까지 기다림
      const updatedRank = await Promise.all(
        loginUserList.docs.map(async (item) => {
          const data = item.data();
          const loginUserDoc = doc(userCollection, data.uid);
          const loginUserScore = query(
            collection(loginUserDoc, x),
            orderBy("scoreCount")
          );

          const loginUserScoreDoc = await getDocs(loginUserScore);

          // 프로미스 해결 후 반환하는 데이터
          return loginUserScoreDoc.docs.map((it) => it.data() as ScoreType);
        })
      );

      // updatedRank는 이제 Promise 배열이 아닌 ScoreType 배열
      setRank(updatedRank.flat());
    } catch (error) {
      console.error("Error fetching and updating data:", error);
    }
  };

  console.log(rank);
  const handleStart = () => {
    auth.signOut();
    if (sound) {
      sound.stop();
    }
    navigation(`/`);
  };

  const x = "someValue";
  useEffect(() => {
    scoreDataList(x);
  }, []);
  useEffect(() => {
    const imgData = async () => {
      const storage = getStorage(firebaseApp);
      try {
        const imageRef = ref(storage, `medal/`);
        const response = await listAll(imageRef);

        const downloadURLPromises = response.items.map((item) =>
          getDownloadURL(item)
        );
        const urls = await Promise.all(downloadURLPromises);

        setImgUrl(urls);
      } catch (error) {
        console.error("Error getting download URLs:", error);
      }
    };
    imgData();
  }, []);

  return (
    <article className="main_article">
      <section className="main_game_page flex items-center">
        <div className="bg-stone-400 h-32"></div>
        <div className="rank_box">
          <img src="/medal.png" alt="메달 아이콘" />
          <div className="rank_tab_box">
            <ul className="flex justify-center cursor-pointer gap-14">
              <li onClick={() => handlescoreDataList("easy")}>Easy</li>
              <li onClick={() => handlescoreDataList("normal")}>Normal</li>
              <li onClick={() => handlescoreDataList("hard")}>Hard</li>
            </ul>
          </div>
          <div className="border-2 border-secondary p-3 w-[70%] rounded-lg">
            <ul>
              {rank
                .slice(0, 5)
                .sort((a, b) => b.scoreCount - a.scoreCount)
                .map((item, index) => (
                  <li key={index} className="border-b border-secondary">
                    <div className="img_txt flex items-center">
                      {index < 5 && (
                        <img src={imgUrl[index]} alt="메달 이미지" />
                      )}
                      <div className="img_txt_score">
                        {item.nicName} <span>{item.scoreCount}점</span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="btn_box2">
            <button
              className="bg-[url('/public/home.png')] bg-no-repeat w-28 h-12 border-0 cursor-pointer bg-cover my-5"
              onClick={handleStart}
            ></button>
          </div>
        </div>
      </section>
    </article>
  );
};

export default RankPage;
