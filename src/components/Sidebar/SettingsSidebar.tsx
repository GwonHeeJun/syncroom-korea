import "./SettingsSidebar.scss";
import { useTranslation } from "react-i18next";

import SettingsSidebarButton from "./SettingsSidebarButton";

import { useDispatch } from "react-redux";
import { closeSidebar } from "../../modules/sidebar";

import Settings from "../../resource/img/icon/settings.svg?react";
import Arrow from "../../resource/img/icon/right-arrow.svg?react";

function SettingsSidebar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const close = () => dispatch(closeSidebar());

  return (
    <div className="settings sidebar">
      <div className="header-container">
        <div>
          <Settings />
          <span>{t('sidebar.settings')}</span>
        </div>
        <button onClick={close}>
          <Arrow fill="#FFFFFF" />
        </button>
      </div>
      <div className="body">
        <SettingsSidebarButton href="/notice" label={t('sidebar.notice')} />
      </div>
    </div>
  );
}

export default SettingsSidebar;
