import {configureStore} from '@reduxjs/toolkit';
import {LinksReducer} from '../features/linksSlice.ts';



export const store = configureStore({
  reducer: {
    links: LinksReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;