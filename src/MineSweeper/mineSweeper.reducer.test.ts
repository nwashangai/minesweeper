import {
  getGrid,
  getStatus,
  getIsClocking,
  getGridLevelsConfig,
} from "./mineSweeper.reducer";

const state = {
  grid: [
    {
      id: "",
      show: true,
      mine: false,
      isPossibleMine: false,
      sibblingsMines: 3,
      point: {
        col: 5,
        row: 5,
      },
    },
  ],
  level: 1,
  levelConfig: { cols: 10, rows: 10, map: "" },
  status: "playing",
  startTime: true,
};

test("It should get grid data from state", () => {
  const grid = getGrid({ mineSweeper: state });
  expect(grid).toEqual(state.grid);
});

test("It should get status data from state", () => {
  const status = getStatus({ mineSweeper: state });
  expect(status).toEqual(state.status);
});

test("It should check if clock is ticking from state", () => {
  const isClockThicking = getIsClocking({ mineSweeper: state });
  expect(isClockThicking).toBeTruthy();
});

test("It should get grid level configuration data from state", () => {
  const gridConfiguration = getGridLevelsConfig({ mineSweeper: state });
  expect(gridConfiguration).toEqual(state.levelConfig);
});
