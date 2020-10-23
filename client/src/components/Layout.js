import React from 'react';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="app-header">scoreboard.app</header>
      <main className="main">
        <section className="page-content">{children}</section>
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
