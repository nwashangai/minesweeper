import { all } from 'redux-saga/effects';

import { minesweeperSaga } from '../MineSweeper/mineSweeper.saga'

export default function* rootSaga() {
    yield all([...minesweeperSaga()]);
}