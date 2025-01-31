import { takeEvery, takeLatest, all, fork } from "redux-saga/effects";

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";
import * as actionTypes from "../actions/actionTypes";

function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
  ]);
}

function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
}

export function* watchSagas() {
  yield fork(watchAuth);
  yield fork(watchBurgerBuilder);
  yield fork(watchOrder);
}
