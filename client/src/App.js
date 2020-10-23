import React from 'react';
import Layout from './components/Layout';
import Scoreboard from './components/Scoreboard';

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
