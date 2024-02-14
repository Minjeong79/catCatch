import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Howl } from "howler";
import {
  firebaseApp,
  firestore,
  signInWithGoogle,
  auth,
} from "./firegase-config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { signInAnonymously } from "firebase/auth";
import { collection } from "firebase/firestore";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";
import "./style/index.css";
import RankPage from "./components/RankPage";
import { gameBgmContext } from "./Context";
import LoginPage from "./components/LoginPage";

interface StepScoreType {
  stepName: string;
  stepNumber: number;
}
const initialStep = {
  stepName: "",
  stepNumber: 0,
};
function App() {
  const [audioURL, setAudioURL] = useState("");
  const [sound, setSound] = useState<Howl | null>(null);
  const [loginUser, setLoginUser] = useState<string | undefined>("");

  const [stepValue, setStepValue] = useState<StepScoreType>(initialStep);
  const userCollection = collection(firestore, "user");

  const sigAanonymous = async () => {
    await signInAnonymously(auth);
    const user = auth?.currentUser;
    setLoginUser(user?.uid);
  };

  //난이도 설정
  const steps = (stepName: string, stepNumber: number) => {
    setStepValue({ stepName, stepNumber });
  };

  //bgm
  const storage = getStorage(firebaseApp);
  const bgmRef = ref(storage, `bgm/in-search-of-the-rainbows-end-67.mp3`);

  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const url = await getDownloadURL(bgmRef);
        setAudioURL(url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAudioUrl();
  }, []);

  useEffect(() => {
    if (audioURL) {
      const newSound = new Howl({
        src: [audioURL],
        html5: true,
      });
      setSound(newSound);
      newSound.play();
    }
  }, [audioURL]);

  const contextValue = {
    sound,
    signInWithGoogle,
    loginUser,
    sigAanonymous,
    userCollection,
    steps,
    stepValue,
  };
  return (
    <div>
      <gameBgmContext.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/rank" element={<RankPage />} />
        </Routes>
      </gameBgmContext.Provider>
    </div>
  );
}

export default App;
