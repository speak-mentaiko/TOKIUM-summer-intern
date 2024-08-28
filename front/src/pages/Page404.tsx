import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userState } from "../hooks/userState.ts";

export const Page404 = () => {
  const userId = useRecoilValue(userState);
  return (
    <>
      <h1>404</h1>
      {userId ? <Link to="/home">戻る</Link> : <Link to="/signin">戻る</Link>}
    </>
  );
};
