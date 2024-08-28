import { useState } from "react";
import { AutoInput } from "./AutoInput";
import { ManualInput } from "./ManualInput";

export const Home = () => {
  const [isAuto, setAuto] = useState(false);
  return (
    <>
    <div className = 'z-0'>
      <nav className="nav">
        <ul>
          <li onClick={() => setAuto(true)}>自動入力</li>
          <li onClick={() => setAuto(false)}>手動入力</li>
        </ul>
      </nav>
      {isAuto ? <AutoInput /> : <ManualInput />}
      </div>
    </>
  );
};

<div>
  <header></header>
  <nav></nav>
  <div></div>
</div>