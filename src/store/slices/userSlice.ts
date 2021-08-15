import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@Store/store';

interface UserState {
  auth: boolean;
}
const initialState: UserState = { auth: false };
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAuth(state, action) {
      return {
        ...state,
        auth: action.payload.auth,
      };
    },
  },
  extraReducers: {},
});

export const getAuth = (state: RootState): boolean => state?.user?.auth || false;
export const { updateAuth } = userSlice.actions;
export default userSlice.reducer;
