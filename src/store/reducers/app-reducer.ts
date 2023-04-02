export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
};

export const appReducer = (
  state = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case 'app/SET_STATUS':
      return { ...state, status: action.status };
    case 'app/SET_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setAppError = (error: string | null) =>
  ({ type: 'app/SET_ERROR', error } as const);
export const setAppStatus = (status: RequestStatusType) =>
  ({ type: 'app/SET_STATUS', status } as const);

export type SetAppErrorActionType = ReturnType<typeof setAppError>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>;

export type AuthActionsType = SetAppErrorActionType | SetAppStatusActionType;

type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
};
