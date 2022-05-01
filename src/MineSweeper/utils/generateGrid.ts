import { LevelConfig, CellType } from "../types";

const geenerateGrid = (data: LevelConfig, id?: string) => {
  const grid: CellType[] = [];

  const { cols, rows } = data;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const hash = `${row}${col}${(row + 1) * 17}`;

      if (id !== undefined) {
        grid.push({
          id: hash,
          show: false,
          mine: 0,
          isMined: false,
          isQuestion: false,
          sibblingsMines: 0,
          point: {
            col,
            row,
          },
        });
      } else {
        grid.push({
          id: hash,
          isMined: false,
        });
      }
    }
  }

  return grid;
};

export default geenerateGrid;
