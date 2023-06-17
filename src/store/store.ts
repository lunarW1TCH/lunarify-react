import { configureStore } from '@reduxjs/toolkit';
import statsSlice, { StatsSlice } from './stats-slice';
import uiSlice, { UISlice } from './ui-slice';

export interface StoreInterface {
  stats: StatsSlice;
  ui: UISlice;
}

const store = configureStore({
  reducer: { stats: statsSlice.reducer, ui: uiSlice.reducer },
});

export default store;
