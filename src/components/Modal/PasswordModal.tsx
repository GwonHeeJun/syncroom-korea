import React, { useCallback } from "react";
import "./PasswordModal.scss";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { closeModal } from "../../modules/modal";
import { joinRoom } from "../../common/util/joinRoom";
import useInput from "../../common/hooks/useInput";

import Lock from "../../resource/img/icon/lock.svg?react";

function PasswordModal() {
  const { t } = useTranslation();
  const { roomName, roomId, temp } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const { input: password } = useInput("");

  const onClick = useCallback(() => {
    joinRoom(roomName, password.value, temp, roomId);
    dispatch(closeModal());
  }, [dispatch, password.value, roomName, roomId, temp]);

  const onKeyPress = useCallback(
    e => {
      if (e.key === "Enter") onClick();
    },
    [onClick],
  );

  return (
    <div className="password modal">
      <div className="title">
        <Lock fill="#000000" />
        <span>{roomName}</span>
      </div>
      <input
        type="text"
        placeholder={t('modal.password.placeholder')}
        onKeyPress={onKeyPress}
        {...password}
      />
      <div className="buttons">
        <button className="abort" onClick={() => dispatch(closeModal())}>
          <span>{t('modal.password.cancel')}</span>
        </button>
        <button
          className="join"
          disabled={password.value.length === 0}
          onClick={onClick}
        >
          <span>{temp ? t('modal.password.tempJoin') : t('modal.password.join')}</span>
        </button>
      </div>
    </div>
  );
}

export default React.memo(PasswordModal);
