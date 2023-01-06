import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserUpdateUserActionTypes } from 'state/actionTypes';
import { userInitialState } from 'state/initialStates';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: userInitialState,
  reducers: {
    updateUserData(state, action: PayloadAction<UserUpdateUserActionTypes>) {
      return (state = action.payload);
    },
  },
});

export const { updateUserData } = userSlice.actions;
