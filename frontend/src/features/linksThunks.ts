import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {Link, LinkForm} from '../types';

export const postLink = createAsyncThunk<Link, LinkForm>(
  'links/post',
  async (linkForm) => {
    const {data} = await axiosApi.post<Link>('/links', linkForm);
    return data;
  }
);