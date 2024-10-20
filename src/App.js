import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSubreddit } from './slices/subredditSlice';
import SubredditLane from './component/SubredditLane';
import './App.css';
import image from './component/images.png'

function App() {
  const lanes = useSelector((state) => state.subreddit.lanes);
  const dispatch = useDispatch();
  const [subredditInput, setSubredditInput] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [selectedSubreddit, setSelectedSubreddit] = useState(''); 
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddSubreddit = () => {
    if (subredditInput.trim() !== '') {
      dispatch(addSubreddit(subredditInput));
      setSubredditInput(''); 
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedSubreddit(e.target.value);
  };

  return (
    <div className="app-container">
      <img src={image} alt="" />
      <div className="input-container">
        <input
          type="text"
          value={subredditInput}
          onChange={(e) => setSubredditInput(e.target.value)}
          placeholder="Enter subreddit name"
        />
        <button onClick={handleAddSubreddit}>Add Subreddit Lane</button>
      </div>

      {isMobileView ? (
        <div className="dropdown-container">
          <select value={selectedSubreddit} onChange={handleDropdownChange}>
            <option value="">Select a subreddit</option>
            {lanes.map((subreddit) => (
              <option key={subreddit} value={subreddit}>
                {subreddit}
              </option>
            ))}
          </select>
          {selectedSubreddit && <SubredditLane subreddit={selectedSubreddit} />}
        </div>
      ) : (
        <div className="lanes-container">
          {lanes.map((subreddit) => (
            <SubredditLane key={subreddit} subreddit={subreddit} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
