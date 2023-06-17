// theme,
// SpotifyApi.UsersTopArtistsResponse
import { createSlice } from '@reduxjs/toolkit';
import { LightMintTheme, Theme, Themes } from './themes';

export interface UISlice {
  theme: Theme;
}

const initialState: UISlice = {
  theme: LightMintTheme,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action) {
      const chosenTheme = Themes.find(theme => theme.name === action.payload);

      if (chosenTheme) {
        state.theme = chosenTheme;
      }
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
