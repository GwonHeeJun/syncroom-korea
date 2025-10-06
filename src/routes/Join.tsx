import "./Join.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { decodeShareLink } from "../common/util/shareLink";
import { joinRoom } from "../common/util/joinRoom";

import SyncroomLogo from "../resource/img/logo/syncroom.svg?react";
import Lock from "../resource/img/icon/lock.svg?react";
import Return from "../resource/img/icon/return.svg?react";

import useInput from "../common/hooks/useInput";

interface JoinProps {
  location: JoinInfoProps;
}
interface JoinInfoProps {
  search: string;
}

function Join({ location: { search } }: JoinProps) {
  const { t } = useTranslation();

  return (
    <div className="Join">
      <Link to="/" className="return">
        <Return />
        {t('join.returnHome')}
      </Link>
      <div className="body">
        <SyncroomLogo />
        <JoinInfo search={search} />
      </div>
    </div>
  );
}

function JoinInfo({ search }: JoinInfoProps) {
  const { t } = useTranslation();
  const { input: inputPassword } = useInput("");
  const Install: JSX.Element = (
    <div className="install">
      {t('join.install')}{" "}
      <a
        href="https://syncroom.yamaha.com/play/dl/"
        target="_blank"
        rel="noreferrer"
      >
        {t('join.installLink')}
      </a>
    </div>
  );

  try {
    const { roomName, roomId, password } = decodeShareLink(search.slice(1));
    console.log({ roomName, roomId, password });
    if (password !== undefined) {
      joinRoom(roomName, password, false, roomId);
      return (
        <>
          <div className="title">{t('join.joining', { roomName })}</div>
          <div className="prompt">
            <button onClick={() => joinRoom(roomName, password, false, roomId)}>
              <span>{t('join.joinButton')}</span>
            </button>
          </div>
          {Install}
        </>
      );
    } else {
      return (
        <>
          <div className="title">
            <Lock fill="#000000" />
            {t('join.enterRoom', { roomName })}
          </div>
          <div className="prompt">
            <input
              type="text"
              placeholder={t('modal.password.placeholder')}
              {...inputPassword}
              onKeyPress={e => {
                if (e.key === "Enter")
                  joinRoom(roomName, inputPassword.value, false, roomId);
              }}
            />
            <button
              className="password"
              onClick={() => joinRoom(roomName, inputPassword.value, false, roomId)}
            >
              <span>{t('join.joinButton')}</span>
            </button>
          </div>
          {Install}
        </>
      );
    }
  } catch (e) {
    console.log(e);
    return (
      <>
        <div className="title">{t('join.invalidLink')}</div>
        <div className="desc">{t('join.checkLink')}</div>
      </>
    );
  }
}

export default Join;
