import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from './components/Header.tsx';
import { SideMenuBar } from './components/SideMenuBar.tsx';
import { AutoInput } from "./pages/AutoInput.tsx";
import { ManualInput } from "./pages/ManualInput.tsx";

export const App = () => {

  const [showSideMenuBarStatus, setShowSideMenuBarStatus] = useState(false);

  const handlesAppearSideMenuBar = () => {
    setShowSideMenuBarStatus(true);
  };

  const handlesDisppearSideMenuBar = () =>{
    setShowSideMenuBarStatus(false);
  }

  return (
    <>
    <BrowserRouter>
      {showSideMenuBarStatus && (
          <SideMenuBar onDisappearClick = {handlesDisppearSideMenuBar}/>
        )}
      <Header onAppearClick = {handlesAppearSideMenuBar}/>
      <Routes>
        <Route index path="/auto" element={<AutoInput />} />
        <Route path="/manual" element={<ManualInput />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};