import { useDispatch } from "react-redux";
import { open } from "./mineSweeper.reducer";
import getCellContent from "./utils/getCellContent";
import { GridItem } from "./MineSweeper.styles";
import { CellType } from "./types";

type Props = {
  data: CellType;
};

const Cell = ({ data }: Props) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    if (!data.show) {
      dispatch(open(data.id));
    }
  };

  return (
    <GridItem
      show={data.show}
      siblings={data.sibblingsMines}
      onClick={handleOpen}
    >
      <span>
        {getCellContent(
          {
            show: data.show,
            siblings: data.sibblingsMines,
            mine: data.mine,
            isQuestion: data.isQuestion,
            isMined: data.isMined,
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
