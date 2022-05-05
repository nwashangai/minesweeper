import store from "./store";

describe("MineSweeper Game redux state tests", () => {
  it("Should initially game data", () => {
    const state = store.getState().mineSweeper;

    expect(state.grid).toEqual([]);
    expect(state.level).toEqual(1);
    expect(state.status).toEqual("playing");
  });
});

describe("MineSweeper Game reducers tests", () => {
  it("Should create new game from default level configuration", async () => {
    const action = {
      type: "minesweeper/createGrame",
      "@@redux-saga/SAGA_ACTION": true,
    };
    await store.dispatch(action);

    expect(store.getState().mineSweeper.grid.length).toEqual(100);
  });

  it("Should set level configuration with open mines", async () => {
    const config = {
      rows: 10,
      cols: 10,
      map: "□□□□□□□□□□□□□□□□□□□□□□□□□*□□□□□□□□□□□□□□□□□□□□□□□□□2□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□",
    };
    const action = {
      type: "minesweeper/setLevelConfig",
      payload: config,
      "@@redux-saga/SAGA_ACTION": true,
    };
    const createAction = {
      type: "minesweeper/createGrame",
      "@@redux-saga/SAGA_ACTION": true,
    };

    await store.dispatch(action);
    await store.dispatch(createAction);

    expect(store.getState().mineSweeper.grid.length).toEqual(100);
    expect(store.getState().mineSweeper.levelConfig.map.length).toEqual(100);
    expect(store.getState().mineSweeper.levelConfig.cols).toEqual(10);
  });

  it("Should change level for current game to Intermediate (2)", async () => {
    const action = {
      type: "minesweeper/changeLevel",
      "@@redux-saga/SAGA_ACTION": true,
      payload: { level: 2 },
    };
    await store.dispatch(action);

    expect(store.getState().mineSweeper.level).toEqual(2);
  });

  it("Should change status for current game to won", async () => {
    const action = {
      type: "minesweeper/updateStatus",
      "@@redux-saga/SAGA_ACTION": true,
      payload: "won",
    };
    await store.dispatch(action);

    expect(store.getState().mineSweeper.status).toEqual("won");
  });

  it("Should open a mine in a given position by Id", async () => {
    const action = { type: "minesweeper/open", payload: "2451" };
    await store.dispatch(action);

    expect(store.getState().mineSweeper.grid.length).toEqual(100);
  });
});
