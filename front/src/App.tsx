import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Header } from "./components/Header.tsx";
import { Sidebar } from "./components/Sidebar";
import { RouteRegistration } from "./components/routelist/RouteRegistration.tsx";
import { Home } from "./pages/home.tsx";
// import { AutoInput } from "./pages/AutoInput.tsx";
// import { ManualInput } from "./pages/ManualInput.tsx";
import { RouteListPage } from "./pages/RouteListPage.tsx";
import { ApplicationListPage } from "./pages/ApplicationListPage.tsx";
import { Sign } from "./pages/Sign.tsx";
import { Page404 } from "./pages/Page404.tsx";

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleIsSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Sign />} />
            {isSidebarOpen ? (
              <Route
                index
                path="/home"
                element={[
                  <Header onToggleIsSidebarOpen={toggleIsSidebarOpen} />,
                  <Home />,
                ]}
              />
            ) : (
              <Route
                index
                path="/home"
                element={[
                  <Header onToggleIsSidebarOpen={toggleIsSidebarOpen} />,
                  <Sidebar />,
                  <Home />,
                ]}
              />
            )}
            {/* <Route path="/auto" element={<AutoInput />} />
          <Route path="/manual" element={<ManualInput />} /> */}
            <Route path="/list/route" element={<RouteListPage />} />
            <Route
              path="/list/route/registration"
              element={<RouteRegistration />}
            />
            <Route path="/list/application" element={<ApplicationListPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <p className="text-blue-500 text-3xl font-bold underline bg-black">
            Hello world!
          </p>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};
