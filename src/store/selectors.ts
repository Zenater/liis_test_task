import { AppRootStateType } from './store';

export const selectHotels = (state: AppRootStateType) => state.hotels.data;
export const selectFavorites = (state: AppRootStateType) => state.favorites;
export const selectUser = (state: AppRootStateType) => state.auth.user;
export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectFilters = (state: AppRootStateType) => state.filters;
export const selectPictures = (state: AppRootStateType) => state.pictures.data;
export const selectError = (state: AppRootStateType) => state.app.error;
