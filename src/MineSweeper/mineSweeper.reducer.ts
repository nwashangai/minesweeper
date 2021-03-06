import { createSlice } from "@reduxjs/toolkit";

import generateGrid from "./utils/generateGrid";
import { InitialStateType } from "./types";

const minesweeper = createSlice({
  name: "minesweeper",
  initialState: {
    grid: [],
    level: 1,
    status: "playing",
    startTime: false,
    levelConfig: { rows: 10, cols: 10, map: "" },
  },
  reducers: {
    changeLevel(state, action) {
      state.level = action.payload.level;
      state.levelConfig.map = "";
    },
    setLevelConfig(state, action) {
      const grid = JSON.parse(JSON.stringify(state.grid));
      state.startTime = false;
      state.levelConfig = action.payload;
      state.grid = generateGrid(action.payload, null, grid);
    },
    updateStatus(state, action) {
      state.status = action.payload;
    },
    open: (state, action) => {
      const grid = JSON.parse(JSON.stringify(state.grid));
      const cellIndex = grid.findIndex((cell) => cell.id === action.payload);
      const cell = grid.find((cell) => cell.id === action.payload);
      if (cell) {
        state.grid[cellIndex] = {
          ...cell,
          show: false,
          mine: false,
        };
      }
    },
    suggestMine: (state, { payload: id }) => {
      const grid = JSON.parse(JSON.stringify(state.grid));
      const index = grid.findIndex((cell) => cell.id === id);

      if (!state.grid[index].show && !state.grid[index].isPossibleMine) {
        state.grid[index].isPossibleMine = true;
      } else if (!state.grid[index].show && state.grid[index].isPossibleMine) {
        state.grid[index].isPossibleMine = false;
      }
    },
    createGrame(state) {
      const gridData = JSON.parse(JSON.stringify(state.levelConfig));
      const { map } = gridData;

      if (map && state.grid.length) {
        for (let i = 0; i < map.length; i++) {
          if (map[i] === "*") {
            state.grid[i].mine = true;
            state.grid[i].show = true;
          } else {
            if (map[i] < 9 && state.grid[i].show === undefined) {
              state.grid[i].mine = false;
              state.grid[i].sibblingsMines = parseInt(map[i]);
              state.grid[i].show = true;
            }
          }
        }
        if (
          !!state.grid.find((field) => field.show || field.isPossibleMine) &&
          !state.startTime
        ) {
          state.startTime = true;
        }
      } else {
        state.status = "playing";
        state.grid = generateGrid(gridData);
      }
    },
  },
});

export const selectLevel = ({
  mineSweeper: state,
}: {
  mineSweeper: InitialStateType;
}) => state.level;

export const getGrid = ({
  mineSweeper: state,
}: {
  mineSweeper: InitialStateType;
}) => state.grid;

export const getCell = (
  { mineSweeper: state }: { mineSweeper: InitialStateType },
  id: string
) => state.grid.find((field) => field.id === id);

export const getStatus = ({
  mineSweeper: state,
}: {
  mineSweeper: InitialStateType;
}) => state.status;

export const getIsClocking = ({
  mineSweeper: state,
}: {
  mineSweeper: InitialStateType;
}) => state.startTime && state.status === "playing";

export const getGridLevelsConfig = ({
  mineSweeper: state,
}: {
  mineSweeper: InitialStateType;
}) => state.levelConfig;

export const {
  createGrame,
  changeLevel,
  setLevelConfig,
  open,
  suggestMine,
  updateStatus,
} = minesweeper.actions;

export default minesweeper.reducer;
