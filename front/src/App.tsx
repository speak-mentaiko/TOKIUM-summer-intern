import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header.tsx";
// import { Sidebar } from './components/Sidebar';
import { RouteRegistration } from "./components/routelist/RouteRegistration.tsx";
import { Home } from "./pages/home.tsx";
// import { AutoInput } from "./pages/AutoInput.tsx";
// import { ManualInput } from "./pages/ManualInput.tsx";
import { RouteListPage } from "./pages/RouteListPage.tsx";
import { ApplicationListPage } from "./pages/ApplicationListPage.tsx";

export const App = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // const toggleIsSidebarOpen = () => {
  //   setIsSidebarOpen(prev => !prev);
  // };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index key ='home' path="/home" element={[<Header />, <Home />]} />
          <Route key = 'list_route' path="/list/route" element={<RouteListPage />} />
          <Route path="/list/route/registration" element={<RouteRegistration />}/>
          <Route path="/list/application" element={<ApplicationListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

