import React from 'react';
import Layout from './components/Layout';
import Scoreboard from './components/Scoreboard';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Scoreboard />
      </Layout>
    </div>
  );
};

export default App;
