import { LevelConfig, CellType } from "../types";

const geenerateGrid = (data: LevelConfig, id?: string, currentGrid = []) => {
  const grid: CellType[] = [];

  const { cols, rows } = data;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const hash = `${row}${col}${(row + 1) * 17}`;
      const isPossibleMine = currentGrid[grid.length]?.isPossibleMine ?? false

      if (id !== undefined && id !== null) {
        grid.push({
          id: hash,
          show: false,
          mine: false,
          isPossibleMine,
          sibblingsMines: 0,
          point: {
            col,
            row,
          },
        });
      } else {
        grid.push({
          id: hash,
          isPossibleMine,
          point: {
            col,
            row,
          },
        });
      }
    }
  }

  return grid;
};

export default geenerateGrid;
