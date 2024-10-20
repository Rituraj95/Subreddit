import React from 'react';
import { useGetSubredditPostsQuery } from '../slices/redditApiSlice';
import { useDispatch } from 'react-redux';
import { removeSubreddit } from '../slices/subredditSlice';
import './SubredditLane.css';

const SubredditLane = ({ subreddit }) => {
  const { data, error, isLoading } = useGetSubredditPostsQuery(subreddit);
  const dispatch = useDispatch();

  return (
    <div className="subreddit-lane">
      <div className="lane-header">
        <h2>r/{subreddit}</h2>
        <button onClick={() => dispatch(removeSubreddit(subreddit))}>Remove</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading posts</p>
      ) : (
        <ul>
          {data?.data?.children?.map((post) => (
            <li key={post.data.id}>
              <h3>{post.data.title}</h3>
              <p>By: {post.data.author}</p>
              <p>Upvotes: {post.data.ups}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubredditLane;
