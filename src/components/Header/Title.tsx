import React from "react";
import { useTranslation } from "react-i18next";

import Logo from "../../resource/img/logo/title.svg?react";
import MenuIcon from "../../resource/img/icon/menu.svg?react";
import SettingsIcon from "../../resource/img/icon/settings.svg?react";

import { openSidebar } from "../../modules/sidebar";
import { useDispatch } from "react-redux";
import { SidebarClass } from "../../modules/sidebar/sidebarClass";

function Title() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ko', emoji: '🇰🇷' },
    { code: 'ja', emoji: '🇯🇵' },
    { code: 'en', emoji: '🇺🇸' }
  ];

  const changeLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex].code);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="Title">
      <button
        className="menu side-btn"
        onClick={() =>
          dispatch(openSidebar({ sidebarClass: SidebarClass.MENU }))
        }
      >
        <MenuIcon />
        <div>MENU</div>
      </button>
      <div>
        <div className="logo-container">
          <Logo />
        </div>
      </div>
      <button
        className="language side-btn"
        onClick={changeLanguage}
      >
        <span className="emoji">{currentLanguage.emoji}</span>
      </button>
      <button
        className="settings side-btn"
        onClick={() =>
          dispatch(openSidebar({ sidebarClass: SidebarClass.SETTINGS }))
        }
      >
        <SettingsIcon />
      </button>
    </div>
  );
}

export default React.memo(Title);
