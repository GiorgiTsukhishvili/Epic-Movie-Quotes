import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from 'state/slices';

export const store = configureStore({
  reducer: { user: userSlice.reducer },
});
