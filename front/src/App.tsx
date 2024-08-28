import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";

import { Routing } from "./components//Routing";

export const App = () => {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};
