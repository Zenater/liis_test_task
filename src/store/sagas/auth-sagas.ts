import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { setIsLoggedIn } from '../reducers/auth-reducer';
import { setAppError, setAppStatus } from '../reducers/app-reducer';
import { AxiosError } from 'axios';
import { LoginFormInputsType } from '../../pages/Login/Login';

const USER_STORAGE_KEY = 'user';

export function* initializeSaga() {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  if (user) {
    yield put(setIsLoggedIn(JSON.parse(user)));
  }
}

export const initializeApp = () => ({ type: 'auth/INITIALIZE_APP' });

export function* logInSaga(action: ReturnType<typeof login>) {
  try {
    yield put(setAppStatus('loading'));
    yield delay(500);
    const response = { email: action.user.email };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response));
    yield put(setIsLoggedIn(response));
    yield put(setAppStatus('succeeded'));
  } catch (error) {
    yield put(setAppError((error as AxiosError).message));
    yield put(setAppStatus('failed'));
  }
}

export const login = (user: LoginFormInputsType) => ({
  type: 'auth/LOG_IN',
  user,
});

export function* logOutSaga() {
  try {
    yield put(setAppStatus('loading'));
    yield delay(500);
    localStorage.removeItem(USER_STORAGE_KEY);
    yield put(setIsLoggedIn(null));
    yield put(setAppStatus('succeeded'));
  } catch (error) {
    yield put(setAppError((error as AxiosError).message));
    yield put(setAppStatus('failed'));
  }
}

export const logOut = () => ({
  type: 'auth/LOG_OUT',
});

export default function* authSagas() {
  yield all([
    takeLatest('auth/INITIALIZE_APP', initializeSaga),
    takeLatest('auth/LOG_IN', logInSaga),
    takeLatest('auth/LOG_OUT', logOutSaga),
  ]);
}
