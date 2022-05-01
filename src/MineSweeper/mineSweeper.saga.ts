import {
  takeEvery,
  call,
  select,
  put,
  take,
  takeLatest,
} from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";

import { COMMANDS, config, STATUS } from "./constants";
import getLevelsConfigFromMap from "./utils/getLevelsConfigFromMap";
import {
  createGrame,
  changeLevel,
  selectLevel,
  getCell,
  setLevelConfig,
  open,
  updateStatus,
} from "./mineSweeper.reducer";

let socket = new WebSocket(config.socketUrl);

function wsInitChannel(ws) {
  return eventChannel((emitter) => {
    ws.onopen = () => emitter({ type: COMMANDS.WS_OPEN });
    ws.onmessage = ({ data }) =>
      emitter({ type: COMMANDS.WS_MESSAGE, payload: data });
    ws.onerror = ({ message }) =>
      emitter({ type: COMMANDS.WS_ERROR, payload: message });
    ws.onclose = () => emitter(END);
    return () => socket.close();
  });
}

function* wsSaga() {
  const action = yield take(yield call(wsInitChannel, socket));

  yield put(action);
}

function* generateGame() {
  const createAction = yield call(createGrame);
  yield put(createAction);
}

function* getConfig() {
  const level = yield select(selectLevel);
  yield put({ type: COMMANDS.WS_SEND, payload: `new ${level}` });
  yield put({ type: COMMANDS.WS_SEND, payload: "map" });
  yield put({ type: COMMANDS.CREATE_GRID });
  yield generateGame;
}

function* emitInitialData(action: any) {
  yield socket.send(action.payload);
}

function* onOpen() {
  yield takeEvery(COMMANDS.WS_OPEN, getConfig);
  yield takeEvery(COMMANDS.WS_SEND, emitInitialData);
  yield takeEvery(COMMANDS.WS_SEND, onRecieveMessage);
}

function* setMap(action) {
  const message = action.payload;

  if (message.startsWith("map:")) {
    const config = getLevelsConfigFromMap(message.replace(/map:/, ""));

    const configAction = yield call(setLevelConfig, config);
    yield put(configAction);
  } else if (message.startsWith("open:")) {
    if (message.includes("win")) {
      yield put(updateStatus(STATUS.WON));
    }

    if (message.includes("You lose")) {
      yield put(updateStatus(STATUS.LOSE));
    }

    yield put({ type: COMMANDS.WS_SEND, payload: "map" });
  }
}

function* setNewLevelConfig() {
  yield takeEvery(changeLevel, getConfig);
  yield takeEvery(setLevelConfig, generateGame);
}

function* onRecieveMessage() {
  const channel = yield call(wsInitChannel, socket);

  while (true) {
    const action = yield take(channel);

    yield call(setMap, action);
  }
}

function* onOpenXY(action) {
  const grid = yield select(getCell, action.payload);
  const { row, col } = grid.point;
  yield put({ type: COMMANDS.WS_SEND, payload: `open ${col} ${row}` });
}

function* openXY() {
  yield takeLatest(open, onOpenXY);
}

export const minesweeperSaga = () => {
  return [wsSaga(), onOpen(), setNewLevelConfig(), openXY()];
};
