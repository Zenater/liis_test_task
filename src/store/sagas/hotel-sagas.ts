import { call, put, select, takeEvery } from 'redux-saga/effects';
import { setAppError, setAppStatus } from '../reducers/app-reducer';
import { selectFilters } from '../selectors';
import { AxiosError, AxiosResponse } from 'axios';
import { instance } from '../../api/Instance/instance';
import { setHotels } from '../reducers/hotel-reducer';
import { FiltersType, HotelTypes } from '../../types/types';

const additionalFilters = {
  currency: 'rub',
  limit: 20,
};

export function* hotelsSaga() {
  try {
    yield put(setAppStatus('loading'));
    const filters: FiltersType = yield select(selectFilters);
    const res: AxiosResponse<HotelTypes[]> = yield call(instance.get, ``, {
      params: { ...additionalFilters, ...filters },
    });
    yield put(setHotels(res.data));
    yield put(setAppStatus('succeeded'));
  } catch (error) {
    yield put(setAppError((error as AxiosError).message));
    yield put(setAppStatus('failed'));
  }
}

export function* hotelsSagas() {
  yield takeEvery('hotel/FETCH_HOTELS', hotelsSaga);
}
