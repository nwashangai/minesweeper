import generateGrid from "./generateGrid";
import { LevelConfig } from "../types";

test("It should generate grid data from game level configuration when id is provided", async () => {
  // Assert
  let config = { rows: 10, cols: 10 } as LevelConfig;
  const grid = generateGrid(config, '1234');
  
  expect(grid.length).toBe(100);
  expect(grid[0].show).toBe(false);
  expect(grid[0].isPossibleMine).toBe(false);
  expect(grid[5].point.col).toBe(5);
  expect(grid[5].point.row).toBe(0);
});

test("It should generate grid data from game level configuration when id is not provided", async () => {
    // Assert
    let config = { rows: 20, cols: 40 } as LevelConfig;
    const grid = generateGrid(config);
    
    expect(grid.length).toBe(800);
    expect(grid[0].show).toBe(undefined);
    expect(grid[0].isPossibleMine).toBe(false);
  });