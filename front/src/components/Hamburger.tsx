import { useState } from "react";
import { Link } from "react-router-dom";

export const Hamburger = () => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const menuOpen = () => {
    setOpened(!isOpened);
  };

  return (
    <>
      <div>#Hamburger</div>
      {!isOpened ? (
        <button onClick={menuOpen}>メニューを表示</button>
      ) : (
        <>
          <div>#SideMenuBar</div>
          <ul>
            <li>
              <Link to="/list/application">申請一覧</Link>
            </li>
            <li>
              <Link to="/list/route">経路一覧</Link>
            </li>
            <li>通知</li>
            <li>定期情報設定</li>
            <li>FAQ</li>
          </ul>
          <button onClick={menuOpen}>メニューを非表示</button>
        </>
      )}
    </>
  );
};
