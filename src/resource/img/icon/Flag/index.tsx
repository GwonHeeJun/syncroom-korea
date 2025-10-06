import KoreaFlag from "./korea.svg?react";
import JapanFlag from "./japan.svg?react";
import OtherFlag from "./other.svg?react";
import type { Language } from "@/schema";

interface FlagProps {
  lang: Language;
}

function Flag({ lang }: FlagProps) {
  const style = { height: "2rem", width: "2rem" };
  switch (lang) {
    case "ymid-kr":
      return <KoreaFlag style={style} />;
    case "ymid-jp":
      return <JapanFlag style={style} />;
    default:
      return <OtherFlag style={style} />;
  }
}

export default Flag;
