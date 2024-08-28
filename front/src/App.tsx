import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Header } from "./components/Header.tsx";
import { RouteRegistration } from "./components/routelist/RouteRegistration.tsx";
import { Home } from "./pages/home.tsx";
// import { AutoInput } from "./pages/AutoInput.tsx";
// import { ManualInput } from "./pages/ManualInput.tsx";
import { RouteListPage } from "./pages/RouteListPage.tsx";
import { ApplicationListPage } from "./pages/ApplicationListPage.tsx";
import { Sign } from "./pages/Sign.tsx";
import { Page404 } from "./pages/Page404.tsx";

export const App = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  // const toggleIsSidebarOpen = () => {
  //   setIsSidebarOpen(prev => !prev);
  // };

  return (
    <>
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
    </>
  );
};
