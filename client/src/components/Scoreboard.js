import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Scoreboard.css';

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const [sortValue, setSortValue] = useState('high');
  const [playerName, setPlayerName] = useState('');
  const [points, setPoints] = useState('');

  const fetchScores = async () => {
    const res = await axios.get('/api/score');
    const sortedScores = sortScores(res.data);
    setScores(sortedScores);
  };

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

        {/* <h3>Add score</h3> */}
        <form onSubmit={addNewScore} className="add-score-form">
          <div className="form-title">Add New Score</div>
          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            type="text"
            name="player"
            placeholder="Player name"
            className="player-name"
          />
          <input
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            type="number"
            min={0}
            name="points"
            placeholder="Points"
            className="player-points"
          />
          <button
            type="submit"
            //className="submit"
            className={!playerName || !points ? 'disabled submit' : 'submit'}
            disabled={!playerName || !points}
          >
            Submit
          </button>
        </form>
      </div>

      {/* <div style={{ paddingTop: '50px' }}>
        {JSON.stringify(scores, null, 2)}
      </div> */}
    </div>
  );
};

export default Scoreboard;
