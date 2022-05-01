import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import rootReducer from "./rootReducer";
import rootSaga from './rootSaga'


const middleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [middleware],
});

middleware.run(rootSaga);

export default store;
