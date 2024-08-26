import React from 'react';
import { Link } from 'react-router-dom'; 
import { Hamburger } from "./Hamburger.tsx";
import { Setting } from "./Setting.tsx";

interface HeaderProps {
  onAppearClick: () => void;
}

export const Header = ({onAppearClick}:HeaderProps) => {
  return (
      <>
      <div>#Header</div>
      <Hamburger onAppearClick = {onAppearClick}/>
      <Setting />
      <nav className ="nav">
          <ul>
            <li>
                  <Link to="/auto">自動入力</Link>
            </li>
            <li>
                  <Link to="/manual">手動入力</Link>
            </li>
          </ul>
      </nav>
      </>
  )
};