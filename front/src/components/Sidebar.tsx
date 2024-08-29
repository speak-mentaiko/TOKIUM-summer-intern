import { AiFillDashboard } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";

import { NavigationItem } from "./NavigationItem.tsx";
import { useIsSidebarOpenState } from "../hooks/isSidebarOpen.ts";

export const Sidebar = () => {
  const isSidebarOpen = useIsSidebarOpenState();

  return (
    <>
      <nav
        className={`${
          isSidebarOpen ? "" : "ml-minus-256"
        } bg-gray-900 p-20 duration-300 z-50 absolute top-64 left-0 bottom-0 right-176 bg-gray-700 text-white`}
      >
        <NavigationItem
          Icon={AiFillDashboard}
          to={"/list/application"}
          name={"申請一覧"}
        />
        <NavigationItem
          Icon={HiOutlineUserGroup}
          to={"/list/route"}
          name={"経路一覧"}
        />
        <NavigationItem Icon={BsGraphUpArrow} to={"/home"} name={"HOME"} />
        <NavigationItem
          Icon={PiSignOutBold}
          to={"/signout"}
          name={"サインアウト"}
        />
      </nav>
    </>
  );
};
