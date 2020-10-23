import React from 'react';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="container">
      <header className="app-header">scoreboard.app</header>
      <main className="main">
        <div className="page-content">{children}</div>
      </main>
      <footer className="app-footer">
        check the code on{' '}
        <a
          href="https://github.com/apltola/scoreboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </footer>
    </div>
  );
};

export default Layout;
