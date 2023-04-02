import { applyMiddleware, combineReducers, createStore } from 'redux';
import { appReducer } from './reducers/app-reducer';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { filtersReducer } from './reducers/filters-reducer';
import { favoritesReducer } from './reducers/favorites-reducer';
import { hotelReducer } from './reducers/hotel-reducer';
import { authReducer } from './reducers/auth-reducer';
import authSagas from './sagas/auth-sagas';
import { picturesReducer } from './reducers/pictures-reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { hotelsSagas } from './sagas/hotel-sagas';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  hotels: hotelReducer,
  filters: filtersReducer,
  favorites: favoritesReducer,
  pictures: picturesReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
  yield all([authSagas(), hotelsSagas()]);
}
//custom hook
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

export type AppRootStateType = ReturnType<typeof rootReducer>;
