import React, { useState } from 'react';

function Home() {
  return <h2>首頁</h2>;
}

function About() {
  return <h2>關於我們</h2>;
}

function Contact() {
  return <h2>聯絡我們</h2>;
}

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    if (page === 'home') return <Home />;
    if (page === 'about') return <About />;
    if (page === 'contact') return <Contact />;
    return <div>找不到頁面</div>;
  };

  return (
    <div>
      <nav>
        <button onClick={() => setPage('home')}>首頁</button>
        <button onClick={() => setPage('about')}>關於</button>
        <button onClick={() => setPage('contact')}>聯絡</button>
      </nav>
      <hr />
      {renderPage()}
    </div>
  );
}

export default App;