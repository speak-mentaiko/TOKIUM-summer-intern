import { useState } from "react";
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
          "flex justify-between items-center p-20 z-10 relative top-0 left-0 bottom-0 w-full h-88 bg-gray-100"
        }
      >
        <button
          className={"cursor-pointer"}
          onClick={() => onToggleIsSidebarOpen()}
        >
          <RxHamburgerMenu size={24} />
        </button>
        <Setting />
      </header>
      {isSidebarOpen && <Sidebar />}
    </>
  );
};
