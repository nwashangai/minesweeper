import { useDispatch, useSelector } from "react-redux";
import { open, suggestMine, getStatus } from "./mineSweeper.reducer";
import getCellContent from "./utils/getCellContent";
import { GridItem } from "./MineSweeper.styles";
import { CellType } from "./types";

type Props = {
  data: CellType;
};

const breakAudio = new Audio("/audios/break.wav");
const wrongMove = new Audio("/audios/wrong-move.wav");
const beep = new Audio("/audios/beep.wav");

const Cell = ({ data }: Props) => {
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  const handleOpen = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();

    if (event.type === "click") {
      if (data.isPossibleMine) {
        beep.currentTime = 0;
        beep.play();
      } else if (!data.show) {
        dispatch(open(data.id));
        breakAudio.currentTime = 0;
        breakAudio.play();
      } else {
        wrongMove.currentTime = 0;
        wrongMove.play();
      }
    } else if (event.type === "contextmenu") {
      dispatch(suggestMine(data.id));
    }
  };

  return (
    <GridItem
      show={data.show}
      siblings={data.sibblingsMines}
      onClick={handleOpen}
      onContextMenu={handleOpen}
      data-testid="cell-test-id"
    >
      <span>
        {getCellContent(
          {
            show: data.show,
            siblings: data.sibblingsMines,
            mine: data.mine,
            isPossibleMine: data.isPossibleMine,
            status,
          },
          (alt) => (
            <div>{alt}</div>
          )
        )}
      </span>
    </GridItem>
  );
};

export default Cell;
