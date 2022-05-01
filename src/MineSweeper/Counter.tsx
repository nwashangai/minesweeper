import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import useCounter from "./utils/useCounterHook";
import {
    getStatus,
    getIsClocking
  } from "./mineSweeper.reducer";

import { Timer } from "../common/Styles";
import zeroPad from "../common/utils/zeroPad";
import { STATUS } from "./constants";

const Counter = React.memo(() => {
  const isClocking = useSelector(getIsClocking);
  const status = useSelector(getStatus);
  const isPlaying = useMemo(() => isClocking && status === STATUS.PLAYING, [isClocking, status])

  return <Timer>{zeroPad(useCounter(isPlaying), 4)}</Timer>;
},);

export default Counter;
