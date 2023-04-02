import dayjs from 'dayjs';
import { FiltersType } from '../../types/types';

export const filtersState = {
  location: 'Москва',
  checkIn: dayjs().format('YYYY-MM-DD'),
  checkOut: dayjs().add(1, 'day').format('YYYY-MM-DD'),
};

export const filtersReducer = (
  state = filtersState,
  action: ActionsType
): FiltersType => {
  switch (action.type) {
    case 'filter/SET_FILTERS':
      return {
        ...state,
        location: action.filters.location,
        checkIn: action.filters.checkIn,
        checkOut: action.filters.checkOut,
      };
    case 'filter/FETCH_FILTERS':
      return { ...state };
    default:
      return state;
  }
};

export const setFilters = (filter: FiltersType) =>
  ({ type: 'filter/SET_FILTERS', filters: filter } as const);
export const fetchFilters = () => ({ type: 'filter/FETCH_FILTERS' } as const);

type ActionsType =
  | ReturnType<typeof setFilters>
  | ReturnType<typeof fetchFilters>;
