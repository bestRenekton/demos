import { all } from 'redux-saga/effects';
import homeSagas from './home/index';


export default function* rootSagas() {
  yield all([
    ...homeSagas
  ]);
}
