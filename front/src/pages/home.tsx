import { useState } from "react";
import { AutoInput } from "./AutoInput";
import { ManualInput } from "./ManualInput";

export const Home = () => {
  const [isAuto, setAuto] = useState(true);

  return (
    <>
      <div className="h-screen w-full overflow-y-auto overflow-x-hidden border border-gray-300 bg-pink-100">
        <div>
          {/* <div className = 'absolute overflow-auto top-0 z-0 bg-pink-100
    h-full w-full overflow-x-hidden border border-gray-300 p-4'> */}
          <nav className="nav">
            <ul className="flex space-x-2">
              <li key="auto" onClick={() => setAuto(true)}>
                自動入力
              </li>
              <li key="manual" onClick={() => setAuto(false)}>
                手動入力
              </li>
            </ul>
          </nav>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="min-h-screen">
            {isAuto ? <AutoInput /> : <ManualInput />}
          </div>
        </div>
      </div>
    </>
  );
};
