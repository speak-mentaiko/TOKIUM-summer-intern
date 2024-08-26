import React from 'react';

interface SideMenuBarProps {
    onAppearClick: () => void;
  }

export const SideMenuBar = ({onDisappearClick}:SideMenuBarProps) => {
    const hideSideMenuBarClick = () =>{
    onDisappearClick();
    };

  return (<>
    <div>#SideMenuBar</div>
    <ul>
        <li>
            申請一覧
        </li>
        <li>
            経路一覧
        </li>
        <li>
            通知
        </li>
        <li>
            定期情報設定
        </li>
        <li>
            FAQ
        </li>
    </ul>
    <button onClick = {hideSideMenuBarClick}>メニューを非表示</button>
    </>
  )
};