import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import "./style.scss";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { SidebarClass } from "../../modules/sidebar/sidebarClass";

import Manage from "./Manage";
import OnlineUser from "./OnlineUser";
import OfflineUser from "./OfflineUser";
import { useUsersStore } from "@/store";
import { useRooms } from "@/api/hooks";

function UserList() {
  const { t } = useTranslation();
  const favoriteUsers = useUsersStore(state => state.favorites);
  const { data } = useRooms();

  const activeUsersMap = useMemo(
    () =>
      new Map<string, string>(
        data?.rooms
          ?.map(room =>
            room.members.map(member => [member.nickname, room.roomId] as const),
          )
          .flat() ?? [],
      ),
    [data?.rooms],
  );

  const { sidebarClass } = useSelector((state: RootState) => state.sidebar);

  const [isActive, setActive] = useState<boolean>(false);
  const [isAdd, setAdd] = useState<boolean>(false);

  useEffect(() => {
    if (sidebarClass !== SidebarClass.MENU) {
      setActive(false);
      setAdd(false);
    }
  }, [sidebarClass]);

  const { onlineUsers, offlineUsers } = useMemo(
    () => ({
      onlineUsers: favoriteUsers.filter(user => activeUsersMap.has(user)),
      offlineUsers: favoriteUsers.filter(user => !activeUsersMap.has(user)),
    }),
    [favoriteUsers, activeUsersMap],
  );

  return (
    <div
      className={classNames("UserList", { active: isActive }, { add: isAdd })}
    >
      <Manage
        isActive={isActive}
        handleActive={setActive}
        isAdd={isAdd}
        handleAdd={setAdd}
      />

      <SimpleBar className="users">
        <div className="status-tag">{t('userList.online')} ― {onlineUsers.length}</div>

        <TransitionGroup component="div">
          {onlineUsers.map(userName => (
            <CSSTransition key={userName} timeout={200} classNames="wrap">
              <OnlineUser
                userName={userName}
                roomId={activeUsersMap.get(userName) ?? ""}
                isActive={isActive}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>

        <div className="status-tag">{t('userList.offline')} ― {offlineUsers.length}</div>

        <TransitionGroup component="div">
          {offlineUsers.map(userName => (
            <CSSTransition key={userName} timeout={200} classNames="wrap">
              <OfflineUser userName={userName} isActive={isActive} />
            </CSSTransition>
          ))}
        </TransitionGroup>

        <div className="padding" />
      </SimpleBar>
    </div>
  );
}

export default React.memo(UserList);
