import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Header } from "./components/Header.tsx";
import { RouteRegistration } from "./components/routelist/RouteRegistration.tsx";
import { Home } from "./pages/home.tsx";
import { RouteListPage } from "./pages/RouteListPage.tsx";
import { ApplicationListPage } from "./pages/ApplicationListPage.tsx";
import { Sign } from "./pages/Sign.tsx";
import { Page404 } from "./pages/Page404.tsx";

export const App = () => {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Sign />} />
            <Route
              index
              key="home"
              path="/home"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              key="list_route"
              path="/list/route"
              element={
                <>
                  <Header />
                  <RouteListPage />
                </>
              }
            />
            <Route
              path="/list/route/registration"
              element={
                <>
                  <Header />
                  <RouteRegistration />
                </>
              }
            />
            <Route
              path="/list/application"
              element={
                <>
                  <Header />
                  <ApplicationListPage />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <Page404 />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};
