import React, { ReactElement } from "react";
import "./style.css";

import Drums from "./drums.svg?react";
import Bass from "./bass.svg?react";
import Electric from "./electric.svg?react";
import Keyboard from "./keyboard.svg?react";
import Vocal from "./vocal.svg?react";
import Private from "./user.svg?react";

interface Avatar {
  type?: "preset" | "url";
  preset?: {
    colorCode: string;
    shapeKey: string;
  };
  url?: string;
}

interface ProfileProps {
  icon?: Avatar;
  part?: string;
}

const partIconMap: Record<string, ReactElement> = {
  drums: <Drums />,
  drum: <Drums />,
  electricBass: <Bass />,
  bass: <Bass />,
  electricGuitar: <Electric />,
  guitar: <Electric />,
  keyboard: <Keyboard />,
  vocal: <Vocal />,
};

function Profile({ icon, part }: ProfileProps) {
  if (!icon || !icon.type) {
    return <Private />;
  }

  if (icon.type === "url") {
    return <img src={icon.url} alt="" />;
  }

  // preset type - show instrument icon based on part
  if (part && partIconMap[part]) {
    return partIconMap[part];
  }

  return <Private />;
}

export default Profile;
