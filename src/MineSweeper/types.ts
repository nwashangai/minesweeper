export type LevelConfig = { cols: number; rows: number; map: string };

export type CellType = {
  id: string;
  show?: boolean;
  mine?: boolean;
  isPossibleMine: boolean;
  sibblingsMines?: number;
  point?: {
    col: number;
    row: number;
  };
};

export type InitialStateType = {
  grid: CellType[];
  level: number;
  levelConfig: LevelConfig;
  status: string;
  startTime: boolean;
};

export type ContentType = {
  show?: boolean;
  mine?: boolean;
  isPossibleMine: boolean;
  siblings?: number;
  status?: string;
};

export type DefaultActionType = {
  type: string;
  payload?: any
}
