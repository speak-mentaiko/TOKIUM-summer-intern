import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Routing } from "./components/Routing";

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
