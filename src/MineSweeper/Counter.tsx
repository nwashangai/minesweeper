import React from "react";
import { useSelector } from "react-redux";

import useCounter from "./utils/useCounterHook";
import {
    getIsClocking
  } from "./mineSweeper.reducer";

import { Timer } from "../common/Styles";
import zeroPad from "../common/utils/zeroPad";

const renderTotalCount = (countString: string) => {
  const digits = countString.split(''); 
  return <>
    {digits.map((digit: string, indx: number) => <img src={`/images/${digit}.svg`} alt={digit} key={`digit-${indx}`} />)}
  </>
}

const Counter = React.memo(() => {
  const isClocking = useSelector(getIsClocking);

  return <Timer>{renderTotalCount(zeroPad(useCounter(isClocking), 4))}</Timer>;
},);

export default Counter;
