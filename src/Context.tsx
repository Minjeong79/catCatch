import { createContext } from "react";
import { Howl } from "howler";
import { collection, getFirestore } from "firebase/firestore";
//https://firebase.google.com/docs/auth/web/anonymous-auth?hl=ko

// Firestore 초기화
const firestore = getFirestore();

// 'user' 컬렉션에 대한 참조 생성
const userCollection = collection(firestore, "user");

// userCollection의 타입 정의
type UserCollectionType = ReturnType<typeof collection>;

//stepValue 관련
interface StepScoreType {
  stepName: string;
  stepNumber: number;
}
const initialStep = {
  stepName: "",
  stepNumber: 0,
};

interface Bgmtype {
  sound: Howl | null;
  signInWithGoogle?: () => void;
  loginUser: string | undefined;
  sigAanonymous: () => void;
  userCollection: UserCollectionType;
  steps: (step: string, index: number) => void;
  stepValue: StepScoreType;
}
const initialGameBgm: Bgmtype = {
  sound: null,
  signInWithGoogle: () => {},
  sigAanonymous: () => {},
  userCollection: userCollection,
  steps: () => {},
  loginUser: "",
  stepValue: initialStep,
};
export const gameBgmContext = createContext(initialGameBgm);
