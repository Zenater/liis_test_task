import { UserType } from '../../types/types';

const initialState: InitialStateType = {
  user: null,
  isInitialized: false,
};

export const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_LOGGED_IN':
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export const setIsLoggedIn = (user: UserType | null) =>
  ({ type: 'auth/SET_LOGGED_IN', user } as const);

type ActionsType = ReturnType<typeof setIsLoggedIn>;

type InitialStateType = {
  user: null | UserType;
  isInitialized: boolean;
};
