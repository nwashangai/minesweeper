import { ReactNode } from "react";
import { ContentType } from "../types";
import { STATUS } from "../constants";

const getCellContent = (
  { show, siblings, mine, isQuestion, isMined, status }: ContentType,
  cb: (alt: any) => ReactNode
) => {
  if (show && !mine) {
    return !!siblings ? siblings : "";
  } else if (show && mine) {
    return cb("💣");
  } else if (!show && isMined && status === STATUS.PLAYING) {
    return cb("🚩");
  } else if (!show && isQuestion && status === STATUS.PLAYING) {
    return cb("❓");
  } else {
    return "";
  }
};

export default getCellContent;
