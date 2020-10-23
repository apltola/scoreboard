import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Scoreboard.css';

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const [sortType, setSortType] = useState('high');
  const [playerName, setPlayerName] = useState('');
  const [points, setPoints] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      const res = await axios.get('/api/score');
      const sortedScores = sortScores(res.data);
      setScores(sortedScores);
    };

    fetchScores();
  }, []);

  const addNewScore = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/score', {
        player: playerName,
        score: points,
      });

      const sortedScores = sortScores(res.data);
      setScores(sortedScores);
      setPlayerName('');
      setPoints('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const arr = [...scores];
    const sortedArr = sortScores(arr);
    setScores(sortedArr);
  }, [sortType]);

  const sortScores = (arr) => {
    if (arr.length === 0) {
      return [];
    }

    return arr.sort((a, b) => {
      if (sortType === 'high') {
        return b.score - a.score;
      } else {
        return a.score - b.score;
      }
    });
  };

  const renderScoresList = () => {
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
      <div className="scoreboard-header">
        <h1 className="title">SCOREBOARD</h1>
        <div>{scores.length} scores</div>
      </div>
      <div className="content">
        <div className="sort-container">
          <label>Sort By Score</label>
          <select
            name="sort"
            defaultValue={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="high">highest first</option>
            <option value="low">lowest first</option>
          </select>
        </div>

        <div className="row title-row">
          <div>Player</div>
          <div>Points</div>
        </div>
        {renderScoresList()}

        <form onSubmit={addNewScore} className="add-score-form">
          <div className="form-title">Add New Score</div>
          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            type="text"
            placeholder="Player name"
            className="player-name"
          />
          <input
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            type="number"
            min={0}
            placeholder="Points"
            className="player-points"
          />
          <button
            type="submit"
            className={!playerName || !points ? 'disabled submit' : 'submit'}
            disabled={!playerName || !points}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Scoreboard;
