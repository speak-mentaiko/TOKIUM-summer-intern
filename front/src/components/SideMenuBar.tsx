import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SideMenuBarProps {
    onAppearClick: () => void;
  }

export const SideMenuBar = ({onDisappearClick}:SideMenuBarProps) => {
    const navigate = useNavigate();

    const toListApplication = () => {
        onDisappearClick();
        navigate('/list/application')
    };

    const toListRoute = () => {
        onDisappearClick();
        navigate('/list/route')
    };

    const hideSideMenuBarClick = () =>{
    onDisappearClick();
    };

  return (<>
    <div>#SideMenuBar</div>
    <ul>
        <li onClick = {toListApplication}>
            申請一覧
        </li>
        <li onClick = {toListRoute}>
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