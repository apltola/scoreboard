import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Scoreboard.css';

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const [sortValue, setSortValue] = useState('high');

  const fetchScores = async () => {
    const res = await axios.get('/api/score');
    setScores(res.data);
    //const sortedData = sortScores(res.data);
    //setScores(sortedData);
  };

  const sortScores = (arr) => {
    if (arr.length === 0) {
      return [];
    }

    return arr.sort((a, b) => {
      if (sortValue === 'high') {
        return b.score - a.score;
      } else {
        return a.score - b.score;
      }
    });
  };

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
    let arr = [...scores];
    const sortedArr = sortScores(arr);
    setScores(sortedArr);
  }, [sortValue]);

  const renderScores = () => {
    if (scores.length === 0) {
      return null;
    }

    return scores.map((score) => {
      return (
        <div className="row data-row" key={score._id}>
          <div>{score.player}</div>
          <div>{score.score}</div>
        </div>
      );
    });
  };

  return (
    <div className="scoreboard">
      <h1 className="title">SCOREBOARD</h1>
      <div className="content">
        <div>
          <label>Sort By Score</label>
          <select
            name="sort"
            defaultValue={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="high">highest first</option>
            <option value="low">lowest first</option>
          </select>
        </div>

        <div className="row title-row">
          <div>Player</div>
          <div>Points</div>
        </div>
        {renderScores()}
      </div>

      {/* <div style={{ paddingTop: '50px' }}>
        {JSON.stringify(scores, null, 2)}
      </div> */}
    </div>
  );
};

export default Scoreboard;
