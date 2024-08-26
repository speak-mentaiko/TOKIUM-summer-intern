import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Header } from './components/Header.tsx';
import { SideMenuBar } from './components/SideMenuBar.tsx';
import { AutoInput } from "./pages/AutoInput.tsx";
import { ManualInput } from "./pages/ManualInput.tsx";

import { RouteListPage } from "./pages/RouteListPage.tsx";
import { RouteRegistration } from "./components/routelist/RouteRegistration.tsx";
import { ApplicationListPage } from "./pages/ApplicationListPage.tsx";

const AppContent: React.FC = () => {
  const location = useLocation();
  const [showSideMenuBarStatus, setShowSideMenuBarStatus] = useState(false);

  const handlesAppearSideMenuBar = () => {
    setShowSideMenuBarStatus(true);
  };

  const handlesDisppearSideMenuBar = () =>{
    setShowSideMenuBarStatus(false);
  }

  const showHeader = !location.pathname.startsWith('/list');

  return (
    <>
      {showSideMenuBarStatus && (
        <SideMenuBar onDisappearClick={handlesDisppearSideMenuBar} />
      )}
      {showHeader && <Header onAppearClick={handlesAppearSideMenuBar} />}
      <Routes>
        <Route index path="/auto" element={<AutoInput />} />
        <Route path="/manual" element={<ManualInput />} />
        <Route path="/list/route" element={<RouteListPage />} />
        <Route path="/list/route/registration" element={<RouteRegistration />} />
        <Route path="/list/application" element={<ApplicationListPage />} />
      </Routes>
    </>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
