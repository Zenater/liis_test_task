import { HotelTypes } from '../../types/types';

const initialState = {
  data: [] as HotelTypes[],
};

export const hotelReducer = (
  state = initialState,
  action: ActionsType
): HotelReducerType => {
  switch (action.type) {
    case 'hotel/FETCH_HOTELS':
      return { ...state };
    case 'hotel/SET_HOTELS':
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export const setHotels = (data: HotelTypes[]) =>
  ({ type: 'hotel/SET_HOTELS', data } as const);
export const fetchHotels = () => ({ type: 'hotel/FETCH_HOTELS' } as const);

type ActionsType =
  | ReturnType<typeof fetchHotels>
  | ReturnType<typeof setHotels>;

export type HotelReducerType = typeof initialState;
