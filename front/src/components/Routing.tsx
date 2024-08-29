import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Header } from "../components/Header";
import { Sign } from "../pages/Sign.tsx";
import { Page404 } from "../pages/Page404.tsx";
import { Home } from "../pages/Home.tsx";
import { RouteListPage } from "../pages/RouteListPage.tsx";
import { Application } from "../pages/Application.tsx";
import { ApplicationListPage } from "../pages/ApplicationListPage.tsx";
import { RouteRegistration } from "./routelist/RouteRegistration.tsx";
import { ApprovalList } from "../pages/ApprovalList.tsx";
import { Signout } from "../pages/Signout.tsx";
import { userState } from "../hooks/userState.ts";
import { Approval } from "../pages/Approval.tsx";

export const Routing = () => {
  const userId = useRecoilValue(userState);
  console.log(userId.user_id);

  if (userId.part === "pvt") {
    return (
      <>
        <Header />
        <Routes>
          <Route key="home" index path="/home" element={<Home />} />
          <Route
            key="list_route"
            path="/list/route"
            element={<RouteListPage />}
          />
          <Route
            path="/list/route/registration"
            element={<RouteRegistration />}
          />
          <Route path="/list/application" element={<ApplicationListPage />} />
          <Route path="/list/application/:costId" element={<Application />} />
          <Route path="/list/approval" element={<ApprovalList />} />
          <Route path="/list/approval/:costId" element={<Approval />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    );
  } else if (userId.part === "pub") {
    return (
      <>
        <Header />
        <Routes>
          <Route key="home" index path="/home" element={<Home />} />
          <Route
            key="list_route"
            path="/list/route"
            element={<RouteListPage />}
          />
          <Route
            path="/list/route/registration"
            element={<RouteRegistration />}
          />
          <Route path="/list/application" element={<ApplicationListPage />} />
          <Route path="/list/application/:costId" element={<Application />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route index path="/signin" element={<Sign />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    );
  }
};
