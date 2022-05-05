import assert from "node:assert/strict";
import { notDeepStrictEqual } from 'node:assert';

import {
  takeEvery,
  call,
  select,
  put,
  take,
  takeLatest,
} from "redux-saga/effects";

import { config, COMMANDS, STATUS } from "./constants";
import {
  wsInitChannel,
  wsSaga,
  generateGame,
  getConfig,
  emitInitialData,
  onOpen,
  updateGame,
  setNewLevelConfig,
  onOpenXY,
  minesweeperSaga,
  openXY,
  onRecieveMessage,
} from "./mineSweeper.saga";
import {
  createGrame,
  changeLevel,
  selectLevel,
  setLevelConfig,
  open,
  updateStatus,
} from "./mineSweeper.reducer";

let socket = new WebSocket(config.socketUrl);

test("It should test wsSaga generator function", async () => {
  const gen = wsSaga();

  assert.deepEqual(
    gen.next().value,
    call(wsInitChannel, socket),
    "should wait to CALL the wsInitChannel with socket param"
  );

  assert.deepEqual(
    gen.next(wsInitChannel as any).value,
    take(wsInitChannel as any),
    "should wait for TAKE effect"
  );

  assert.deepEqual(
    gen.next(wsInitChannel as any).value,
    put(wsInitChannel as any),
    "should wait for PUT effect"
  );
});

test("It should test generateGame generator function", async () => {
  const gen = generateGame();

  assert.deepEqual(
    gen.next().value,
    call(createGrame),
    "should wait to CALL the createGrame reducer function"
  );

  assert.deepEqual(
    gen.next(createGrame).value,
    put(createGrame),
    "should wait for PUT effect"
  );
});

test("It should test getConfig generator function", async () => {
  const gen = getConfig();

  assert.deepEqual(
    gen.next().value,
    select(selectLevel),
    "should wait to call the selectLevel reducer function"
  );

  assert.deepEqual(
    gen.next(createGrame).value,
    put({ payload: "new minesweeper/createGrame", type: "WS_SEND" }),
    "should wait for PUT effect"
  );

  assert.deepEqual(
    gen.next(createGrame).value,
    put({ payload: "map", type: "WS_SEND" }),
    "should wait for second PUT effect"
  );

  assert.deepEqual(
    gen.next(createGrame).value,
    put({ type: "CREATE_GRID" }),
    "should wait for third PUT effect"
  );

  assert.deepEqual(
    gen.next(createGrame).value,
    generateGame(),
    "should call generateGame generator"
  );
});

test("It should test emitInitialData generator function", async () => {
  const gen = emitInitialData({ type: "WS_SEND", payload: "map" });

  assert.deepEqual(
    gen.next().value,
    socket.send("map"),
    "should wait to CALL the createGrame reducer function"
  );
});

test("It should test onOpen generator function", async () => {
  const gen = onOpen();

  assert.deepEqual(
    gen.next().value,
    takeEvery(COMMANDS.WS_OPEN, getConfig),
    "should wait for TAKEEVERY effect to be called"
  );

  assert.deepEqual(
    gen.next().value,
    takeEvery(COMMANDS.WS_SEND, emitInitialData),
    "should wait for second TAKEEVERY effect to be called"
  );

  assert.deepEqual(
    gen.next().value,
    takeEvery(COMMANDS.WS_SEND, onRecieveMessage),
    "should wait for third TAKEEVERY effect to be called"
  );
});

test("It should test updateGame generator function with map update action", async () => {
  const gen = updateGame({
    type: "TEST",
    payload: `map: □□□□□□□□□□
□□□□□□□□□□
□□□□□□□□□□
□□□□□□□□□□
□□□□□□□□□□
□□□□□□□□□□
□□□□□□□□□□
□□□□□□□□□□
□□□□□□□□□□
□□□□□□□□□□`,
  });

  assert.deepEqual(
    gen.next().value,
    call(setLevelConfig, { rows: 10, cols: 10, map: '□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□' }),
    "should wait to CALL the setLevelConfig reducer function with config"
  );

  assert.deepEqual(
    gen.next({type: 'TEST', payload: 'map'}).value,
    put({type: 'TEST', payload: 'map'}),
    "should wait for PUT effect"
  );
});

test("It should test updateGame generator function for open action and lost game", async () => {
  const gen = updateGame({
    type: "TEST",
    payload: `open: You lose`,
  });

  assert.deepEqual(
    gen.next().value,
    put(updateStatus(STATUS.LOSE)),
    "should wait for PUT effect with update staus action"
  );

  assert.deepEqual(
    gen.next({ type: COMMANDS.WS_SEND, payload: "map" }).value,
    put({ type: COMMANDS.WS_SEND, payload: "map" }),
    "should wait for second PUT effect with get map action"
  );
});

test("It should test updateGame generator function for open action and win game", async () => {
  const gen = updateGame({
    type: "TEST",
    payload: `open: You win`,
  });

  assert.deepEqual(
    gen.next().value,
    put(updateStatus(STATUS.WON)),
    "should wait for PUT effect with update staus action"
  );

  assert.deepEqual(
    gen.next({ type: COMMANDS.WS_SEND, payload: "map" }).value,
    put({ type: COMMANDS.WS_SEND, payload: "map" }),
    "should wait for second PUT effect with get map action"
  );
});

test("It should test setNewLevelConfig generator function", async () => {
  const gen = setNewLevelConfig();

  assert.deepEqual(
    gen.next().value,
    takeEvery(changeLevel, getConfig),
    "should wait for TAKEEVERY effect to be called"
  );

  assert.deepEqual(
    gen.next().value,
    takeEvery(setLevelConfig, generateGame),
    "should wait for second TAKEEVERY effect to be called"
  );
});

test("It should test onRecieveMessage generator function", async () => {
  const gen = onRecieveMessage();

  assert.deepEqual(
    gen.next().value,
    call(wsInitChannel, socket),
    "should wait to CALL the wsInitChannel with socket param"
  );

  assert.deepEqual(
    gen.next(wsInitChannel as any).value,
    take(wsInitChannel as any),
    "should wait for TAKE effect"
  );

  assert.deepEqual(
    gen.next(wsInitChannel as any).value,
    call(updateGame as any, wsInitChannel),
    "should wait to CALL the updateGame function with action to dispatch"
  );
});

test("It should test onOpenXY generator function", async () => {
  const action = {type: COMMANDS.WS_SEND, payload: 'map'};
  const gen = onOpenXY(action);

  notDeepStrictEqual(
    gen.next().value,
    select(function getCell() { return '22235'}),
    "should wait to call the getCell reducer function"
  );
});

test("It should test openXY generator function", async () => {
  const gen = openXY();

  assert.deepEqual(
    gen.next().value,
    takeLatest(open, onOpenXY),
    "should wait for second TAKELATEST effect to be called"
  );
});

test("It should test minesweeperSaga function", async () => {
  const sagas = minesweeperSaga();

  expect(sagas.length).toBe(4)
});

test("It should test WebSocket function", async () => {
  const ws = wsInitChannel(socket);
  var closeSocket = jest.spyOn(WebSocket.prototype, "close")
  var sendMessage = jest.spyOn(WebSocket.prototype, "send")
  socket.send("new 1");
  ws.close()

  expect(closeSocket).toHaveBeenCalled(); 
  expect(sendMessage).toHaveBeenCalled();
});