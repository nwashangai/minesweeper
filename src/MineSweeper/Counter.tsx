import React from "react";
import { useSelector } from "react-redux";

import useCounter from "./utils/useCounterHook";
import {
    getIsClocking
  } from "./mineSweeper.reducer";

import { Timer } from "../common/Styles";
import zeroPad from "../common/utils/zeroPad";

const Counter = React.memo(() => {
  const isClocking = useSelector(getIsClocking);

  return <Timer>{zeroPad(useCounter(isClocking), 4)}</Timer>;
},);

export default Counter;
