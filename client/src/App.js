import React from 'react';
import Game from './components/Game';
import Layout from './components/Layout';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Game />
      </Layout>
    </div>
  );
};

export default App;
