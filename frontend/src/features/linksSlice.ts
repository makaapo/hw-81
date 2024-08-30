import {createSlice} from '@reduxjs/toolkit';
import {postLink} from './linksThunks.ts';
import {Link} from '../types.ts';


export interface linkState {
  link: Link | null;
  isLoading: boolean;
}

const initialState: linkState = {
  link: null,
  isLoading: false,
};

const LinksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(postLink.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postLink.fulfilled, (state, {payload: link }) => {
      state.isLoading = false;
      state.link = link;
    });
    builder.addCase(postLink.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {
    selectLink: (state) => state.link,
    selectLinkFetching: (state) => state.isLoading,
  },
});


export const LinksReducer = LinksSlice.reducer;

export const {
  selectLink,
  selectLinkFetching,
} = LinksSlice.selectors;