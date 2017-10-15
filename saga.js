/* global fetch */

import { all, put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-fetch';

import {
  actionTypes,
  failure,
  loadDataSuccess
} from './components/Story/actions';

es6promise.polyfill();

function* loadDataSaga() {
  try {
    const res = yield fetch('/static/story.json');
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([takeLatest(actionTypes.LOAD_DATA, loadDataSaga)]);
}

export default rootSaga;
