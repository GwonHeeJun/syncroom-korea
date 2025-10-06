import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { joinRoom } from "../../common/util/joinRoom";

import { useDispatch } from "react-redux";
import { openModal } from "../../modules/modal";
import { ModalClass } from "../../modules/modal/modalClass";

import Share from "../../resource/img/icon/share.svg?react";
import Notification from "../../resource/img/icon/notification.svg?react";
import { Status } from "@/common/classes/properties";

interface ButtonsProps {
  name: string;
  roomId: string;
  isPublic: boolean;
  isFull: boolean;
  changeSubscription: () => void;
  isSubscribed: boolean;
}

function Buttons({
  name,
  roomId,
  isPublic,
  isFull,
  changeSubscription,
  isSubscribed,
}: ButtonsProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const join = isPublic
    ? (temp: boolean) => {
        joinRoom(name, "", temp, roomId);
      }
    : (temp: boolean) => {
        dispatch(
          openModal({
            modalClass: ModalClass.PASSWORD,
            roomName: name,
            roomId,
            temp,
          }),
        );
      };
  const share = () => {
    dispatch(
      openModal({
        modalClass: ModalClass.SHARE,
        roomName: name,
        roomId,
        status: isPublic ? Status.PUBLIC : Status.PRIVATE,
      }),
    );
  };

  return (
    <div className="Buttons">
      <button className="shareBtn" onClick={share}>
        <Share />
        <span>{t('room.share')}</span>
      </button>
      {isFull ? (
        <div>
          <button
            className={classNames("notiBtn", { subscibed: isSubscribed })}
            onClick={changeSubscription}
          >
            <Notification />
            <span>{isSubscribed ? t('room.notifyCancel') : t('room.notify')}</span>
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => join(true)}>
            <span>{t('room.tempJoin')}</span>
          </button>
          <button className="joinBtn" onClick={() => join(false)}>
            <span>{t('room.join')}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Buttons);
