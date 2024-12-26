import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Video } from "../../types/video/video.type.ts";

type VideosState = {
  videos: Video[];
  totalResults: number;
  nextPageToken: string | null;
  prevPageToken: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: VideosState = {
  videos: [],
  totalResults: 0,
  nextPageToken: null,
  prevPageToken: null,
  loading: false,
  error: null,
};

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (
    { query, pageToken }: { query: string; pageToken?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/search?q=${encodeURIComponent(
          query,
        )}&maxResults=10${pageToken ? `&pageToken=${pageToken}` : ''}`,
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVideos.fulfilled,
        (
          state,
          action: PayloadAction<{
            results: Video[];
            totalResults: number;
            nextPageToken: string | null;
            prevPageToken: string | null;
          }>,
        ) => {
          state.videos = action.payload.results;
          state.totalResults = action.payload.totalResults;
          state.nextPageToken = action.payload.nextPageToken;
          state.prevPageToken = action.payload.prevPageToken;
          state.loading = false;
        },
      )
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default videosSlice.reducer;
