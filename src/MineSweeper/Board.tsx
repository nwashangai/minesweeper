import React from "react";
import { useSelector } from "react-redux";
import { GridContainer } from "./MineSweeper.styles";
import { getGrid, getGridLevelsConfig } from "./mineSweeper.reducer";
import { Card } from "../common/Styles";
import Cell from "./Cell";
import Overlay from "./Overlay";

type Props = {
  handleSelect: (value: string) => void;
};

const Board = ({ handleSelect }: Props) => {
  const { rows, cols } = useSelector(getGridLevelsConfig);
  const grid = useSelector(getGrid);

  return (
    <Card
      styles="position: relative; display: flex; justify-content: space-between;"
      isReversed
    >
      <GridContainer
        gridTemplate={`repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`}
      >
        {grid.map((item) => (
          <Cell data={item} key={item.id} />
        ))}
      </GridContainer>
      <Overlay handleSelect={handleSelect} />
    </Card>
  );
};

export default React.memo(Board);
