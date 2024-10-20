import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query API slice for fetching subreddit posts
export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.reddit.com/' }),
  endpoints: (builder) => ({
    getSubredditPosts: builder.query({
      query: (subreddit) => `r/${subreddit}.json`,
    }),
  }),
});

// Export the auto-generated hook for the query
export const { useGetSubredditPostsQuery } = redditApi;
