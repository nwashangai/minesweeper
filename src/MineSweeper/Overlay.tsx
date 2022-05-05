import { useSelector } from "react-redux";

import { getStatus, selectLevel } from "./mineSweeper.reducer";
import { OverlayContainer, OverlayContent } from "./MineSweeper.styles";
import { STATUS } from "./constants";

type Props = {
  handleSelect: (value: string) => void;
};

const Overlay = ({ handleSelect }: Props) => {
  const status = useSelector(getStatus);
  const level = useSelector(selectLevel);
  const isGameWon = status === STATUS.WON;

  const imgUrl = isGameWon
    ? "https://www.google.com/logos/fnbx/minesweeper/trophy_icon.png"
    : "https://www.google.com/logos/fnbx/minesweeper/clock_icon.png";

  return (
    <OverlayContainer isPlaying={status === STATUS.PLAYING}>
      <OverlayContent>
        <img src={imgUrl} alt="" />
        <span>{isGameWon ? "You Win" : "Game Over"}</span>
        <button onClick={() => handleSelect(String(level))}>
          <img
            src="https://www.gstatic.com/images/icons/material/system/2x/refresh_white_24dp.png"
            alt=""
          />
          <span>{isGameWon ? "New game" : "Try again"}</span>
        </button>
      </OverlayContent>
    </OverlayContainer>
  );
};

export default Overlay;
