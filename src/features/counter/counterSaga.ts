import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchCount } from './counterAPI';
import { increment, incrementSaga, incrementSagaSuccess } from './counterSlice';

function* test() {
  yield fetchCount(2);
  //and
  yield call(fetchCount, 2);
}
function* handleIncrementSaga(action: PayloadAction<number>) {

  yield delay(2000);


  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {

  yield takeEvery(incrementSaga.toString(), handleIncrementSaga); // '*' only dispatch action then it will log action
  // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
