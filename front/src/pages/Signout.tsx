import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { userState } from "../hooks/userState";

export const Signout = () => {
  const [userId, setUserId] = useRecoilState(userState);
  setUserId("");
  return (
    <>
      <p>サインアウトしました</p>
      <Link to="/signin">戻る</Link>
    </>
  );
};
