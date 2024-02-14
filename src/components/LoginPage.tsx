import { useState, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { gameBgmContext } from "../Context";
import { auth } from "../firegase-config";
import { doc, setDoc } from "firebase/firestore";

type Action = {
  type: string;
  payload: UserType;
};
//데이터 타입
interface UserType {
  uid?: string;
  nicName: string;
}
const initial: UserType[] = [
  {
    uid: "",
    nicName: "",
  },
];
function reducer(state: UserType[], action: Action) {
  switch (action.type) {
    case "CREATEUSER": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
const LoginPage = () => {
  const [newUser, dispatch] = useReducer(reducer, initial);
  console.log(newUser);
  const { sound, userCollection } = useContext(gameBgmContext);

  const [userName, setUserName] = useState("");

  const navigation = useNavigate();

  const users = auth?.currentUser;
  const uid = users?.uid;

  const hadnleUserScore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName) {
      alert("닉네임을 입력해주세요");
      return;
    }
    try {
      const newUserDb = {
        uid: uid,
        nicName: userName,
      };

      dispatch({
        type: "CREATEUSER",
        payload: newUserDb,
      });
      await setDoc(doc(userCollection, uid), newUserDb);
      setUserName("");
      if (sound) {
        sound.play();
      }
      navigation(`/main`, { state: { nicName: userName } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="main_article">
      <section className="bg-[url('/public/bg.png')] bg-cover w-full h-screen relative">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex items-center justify-center w-full h-2/5">
            <h1 className="bg-[url('/public/logo.png')] bg-no-repeat h-screen w-96 bg-center bg-no-repeat bg-cotain h-[80%]"></h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-5 text-center">
            <div>닉네임을 입력 해주세요</div>
            <form onSubmit={hadnleUserScore}>
              <input
                type="text"
                className="w-full h-10 border rounded-lg border-slate-400 pl-2.5"
                placeholder="닉네임"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[url('/public/start.png')] bg-no-repeat w-28 h-12 border-0 cursor-pointer bg-cover mt-2.5"
              ></button>
            </form>
          </div>
        </div>
      </section>
    </article>
  );
};

export default LoginPage;
