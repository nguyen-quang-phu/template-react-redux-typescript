import { Action, AnyAction, CombinedState, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { LOG_OUT } from '@Constant/auth';
import noteReducer from '@Slice/noteSlice';
import userReducer from '@Slice/userSlice';

type RootReducer = CombinedState<{
  user: ReturnType<typeof userReducer>;
  note: ReturnType<typeof noteReducer>;
}>;
type State = RootReducer | undefined;
const appReducer = combineReducers({ user: userReducer, note: noteReducer });

const rootReducer = (state: State, action: AnyAction): RootReducer => {
  if (action.type === LOG_OUT) state = undefined;
  return appReducer(state, action);
};

const store = configureStore({ reducer: rootReducer });

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
