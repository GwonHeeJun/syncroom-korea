export const joinRoom = (name: string, password: string, temp: boolean, roomId: string) => {
  const urienc = function (str: string) {
    return encodeURIComponent(str)
      .replace(/[!*'()]/g, (c) => {
        return "%" + c.charCodeAt(0).toString(16);
      });
  };

  const mode = temp ? 3 : 2;
  const pid = 4;

  const str = `joingroup?mode=${urienc(String(mode))}&pid=${urienc(String(pid))}&nickname=&groupname=${urienc(name)}&password=${urienc(password)}&room_id=${urienc(roomId)}`;

  let uri = 'syncroom2:';
  const tbl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let len = str.length;
  const mod = len % 3;
  if (mod > 0)
    len -= mod;

  let i, t;
  for (i = 0; i < len; i += 3) {
    t = str.charCodeAt(i + 0) << 16 |
        str.charCodeAt(i + 1) <<  8 |
        str.charCodeAt(i + 2);
    uri += tbl.charAt(t >> 18 & 0x3F);
    uri += tbl.charAt(t >> 12 & 0x3F);
    uri += tbl.charAt(t >>  6 & 0x3F);
    uri += tbl.charAt(t       & 0x3F);
  }
  if (mod == 2) {
    t = str.charCodeAt(i + 0) << 16 |
        str.charCodeAt(i + 1) <<  8;
    uri += tbl.charAt(t >> 18 & 0x3F);
    uri += tbl.charAt(t >> 12 & 0x3F);
    uri += tbl.charAt(t >>  6 & 0x3F);
    uri += '=';
  } else if (mod == 1) {
    t = str.charCodeAt(i + 0) << 16;
    uri += tbl.charAt(t >> 18 & 0x3F);
    uri += tbl.charAt(t >> 12 & 0x3F);
    uri += '=';
    uri += '=';
  }

  window.location.href = uri;
};
