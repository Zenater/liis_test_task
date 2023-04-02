import { FavoriteType } from '../../types/types';

export const favoritesReducer = (
  state = [] as FavoriteType[],
  action: ActionsType
): FavoriteType[] => {
  switch (action.type) {
    case 'favorites/ADD_FAVORITE':
      return [{ ...action.favorite }, ...state];
    case 'favorites/REMOVE_FAVORITE':
      return state.filter((favorite) => favorite !== action.favorite);
    default:
      return state;
  }
};

export const addFavorite = (favorite: FavoriteType) =>
  ({ type: 'favorites/ADD_FAVORITE', favorite } as const);
export const removeFavorite = (favorite: FavoriteType) =>
  ({ type: 'favorites/REMOVE_FAVORITE', favorite } as const);

type ActionsType =
  | ReturnType<typeof addFavorite>
  | ReturnType<typeof removeFavorite>;
