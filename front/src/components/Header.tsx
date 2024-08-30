import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

import { Setting } from "./Setting";
import { Sidebar } from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const onToggleIsSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <header
        className={
          "flex justify-between items-center p-20 z-10 relative top-0 left-0 bottom-0 w-full h-88 bg-gray-300"
        }
      >
        <button
          className={"cursor-pointer"}
          onClick={() => onToggleIsSidebarOpen()}
        >
          <RxHamburgerMenu size={24} />
        </button>
        <Link to="/home">
          <AiOutlineHome size={24} />
        </Link>
        <Setting />
      </header>
      {isSidebarOpen && <Sidebar />}
    </>
  );
};
