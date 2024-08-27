import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header.tsx";
import { RouteRegistration } from "./components/routelist/RouteRegistration.tsx";

import { Home } from "./pages/home.tsx";
import { AutoInput } from "./pages/AutoInput.tsx";
import { ManualInput } from "./pages/ManualInput.tsx";
import { RouteListPage } from "./pages/RouteListPage.tsx";
import { ApplicationListPage } from "./pages/ApplicationListPage.tsx";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/home" element={<Home />} />
          <Route path="/auto" element={<AutoInput />} />
          <Route path="/manual" element={<ManualInput />} />
          <Route path="/list/route" element={<RouteListPage />} />
          <Route
            path="/list/route/registration"
            element={<RouteRegistration />}
          />
          <Route path="/list/application" element={<ApplicationListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
