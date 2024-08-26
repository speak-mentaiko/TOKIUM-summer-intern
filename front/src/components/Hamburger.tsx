import React from 'react';

interface HamburgerProps {
  onAppearClick: () => void;
}

export const Hamburger = ({onAppearClick}: HamburgerProps) => {

  const showSideMenuBarClick = () =>{
  onAppearClick();
  };

  return (<>
    <div>#Hamburger</div>
    <button onClick = {showSideMenuBarClick}>メニューを表示</button>
    </>
  )
};