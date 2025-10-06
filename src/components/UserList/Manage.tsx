import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

import useInput from "../../common/hooks/useInput";

import Plus from "../../resource/img/icon/plus.svg?react";
import Return from "../../resource/img/icon/return.svg?react";
import { useUsersStore } from "@/store";

interface ManageProps {
  isActive: boolean;
  handleActive: (state: boolean) => void;
  isAdd: boolean;
  handleAdd: (state: boolean) => void;
}

function Manage({ isActive, handleActive, isAdd, handleAdd }: ManageProps) {
  const { t } = useTranslation();
  const addFavorite = useUsersStore(state => state.addFavoriteUser);
  const inputRef = useRef<HTMLInputElement>(null);

  const { input, setValue } = useInput("");

  const onClickPlus = useCallback(() => {
    setValue("");
    if (isAdd) {
      if (input.value) {
        addFavorite(input.value.trim());
        handleAdd(false);
      }
    } else {
      handleAdd(true);
      inputRef.current?.focus();
    }
  }, [isAdd, handleAdd, addFavorite, input.value, setValue]);

  const onKeyPress = useCallback(
    e => {
      if (e.key === "Enter") onClickPlus();
    },
    [onClickPlus],
  );

  return (
    <div className="Manage">
      <span>{t('userList.favorites')}</span>

      <button
        className="multi"
        onClick={() => {
          handleActive(!isActive);
          handleAdd(false);
        }}
      >
        {isActive ? t('userList.back') : t('userList.manage')}
      </button>

      <button className="background return" onClick={() => handleAdd(false)}>
        <Return />
      </button>

      <input
        type="text"
        placeholder={t('userList.placeholder')}
        onKeyPress={onKeyPress}
        ref={inputRef}
        {...input}
      />

      <button className="background plus" onClick={onClickPlus}>
        <Plus />
      </button>
    </div>
  );
}

export default React.memo(Manage);
