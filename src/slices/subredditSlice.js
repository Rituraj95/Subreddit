import { createSlice } from '@reduxjs/toolkit';


const subredditSlice = createSlice({
  name: 'subreddit',
  initialState: {
    lanes: [], 
  },
  reducers: {
    addSubreddit: (state, action) => {
      if (!state.lanes.includes(action.payload)) {
        state.lanes.push(action.payload);
      }
    },
    removeSubreddit: (state, action) => {
      state.lanes = state.lanes.filter(subreddit => subreddit !== action.payload);
    },
  },
});

export const { addSubreddit, removeSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;
