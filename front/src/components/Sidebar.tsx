import { useRecoilValue } from "recoil";
import {
  AiFillDashboard,
  AiOutlineHome,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import {} from "react-icons/ai";
import { PiSignOutBold, PiMapPinLight } from "react-icons/pi";

import { NavigationItem } from "./NavigationItem.tsx";
import { useIsSidebarOpenState } from "../hooks/isSidebarOpen.ts";
import { userState } from "../hooks/userState.ts";

export const Sidebar = () => {
  const isSidebarOpen = useIsSidebarOpenState();
  const userId = useRecoilValue(userState);

  console.log(userId.part);

  if (userId.part === "pvt") {
    console.log("test");
    return (
      <>
        <div
          className={`${
            isSidebarOpen ? "" : "ml-minus-256"
          } p-20 duration-300 z-50 absolute top-88 left-0 bottom-0 right-176 bg-pink-100`}
        >
          <NavigationItem Icon={AiOutlineHome} to={"/home"} name={"HOME"} />
          <NavigationItem
            Icon={AiFillDashboard}
            to={"/list/application"}
            name={"申請一覧"}
          />
          <NavigationItem
            Icon={PiMapPinLight}
            to={"/list/route"}
            name={"経路一覧"}
          />
          <NavigationItem
            Icon={AiOutlineCheckCircle}
            to={"/list/approval"}
            name={"経費承認"}
          />
          <NavigationItem
            Icon={PiSignOutBold}
            to={"/signout"}
            name={"サインアウト"}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={`${
            isSidebarOpen ? "" : "ml-minus-256"
          } p-20 duration-300 z-50 absolute top-88 left-0 bottom-0 right-176 bg-pink-100`}
        >
          <NavigationItem Icon={AiOutlineHome} to={"/home"} name={"HOME"} />
          <NavigationItem
            Icon={AiFillDashboard}
            to={"/list/application"}
            name={"申請一覧"}
          />
          <NavigationItem
            Icon={PiMapPinLight}
            to={"/list/route"}
            name={"経路一覧"}
          />
          <NavigationItem
            Icon={PiSignOutBold}
            to={"/signout"}
            name={"サインアウト"}
          />
        </div>
      </>
    );
  }
};
