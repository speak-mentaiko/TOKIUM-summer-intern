import { useState } from "react";
import { AutoInput } from "./AutoInput";
import { ManualInput } from "./ManualInput";

export const Home = () => {
  const [isAuto, setAuto] = useState(true);

  return (
    <>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only"></label>
        <select
          id="tabs"
          className=" justify-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option key="auto" onClick={() => setAuto(true)}>
            自動入力
          </option>
          <option key="manual" onClick={() => setAuto(false)}>
            手動入力
          </option>
        </select>
      </div>
      <ul className="  justify-center hidden text-sm font-28px text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full focus-within:z-10 items-center">
          <a
            href="#"
            key="auto"
            onClick={() => setAuto(true)}
            className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
            aria-current="page"
          >
            自動入力
          </a>
        </li>
        <li className="w-full focus-within:z-10">
          <a
            href="#"
            key="manual"
            onClick={() => setAuto(false)}
            className=" items-center inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            手動入力
          </a>
        </li>
      </ul>
      <div className="min-h-screen">
        {isAuto ? <AutoInput /> : <ManualInput />}
      </div>
    </>
  );
};
