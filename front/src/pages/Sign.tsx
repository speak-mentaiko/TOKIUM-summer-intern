import { useState } from "react";

import { Signin } from "../components/Signin";
import { Signup } from "../components/Signup";

export const Sign = () => {

  const [isSignUp, setSugnUp] = useState(false);
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
      {!isSignUp ? <Signin /> : <Signup />}
    </>
  );
};
