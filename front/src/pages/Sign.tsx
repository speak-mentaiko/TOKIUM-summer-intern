import { useState } from "react";

import { Signin } from "../components/Signin";
import { Signup } from "../components/Signup";

export const Sign = () => {
  const [isSignUp, setSugnUp] = useState(false);

  //ログイン状態を確認しログインしてあればホームにリダイレクト

  return (
    <>
      <button
        onClick={() => {
          setSugnUp(false);
        }}
      >
        サインイン
      </button>
      <button
        onClick={() => {
          setSugnUp(true);
        }}
      >
        サインアップ
      </button>
      {isSignUp ? <Signup /> : <Signin />}
    </>
  );
};
