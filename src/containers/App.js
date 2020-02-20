import React from 'react';
import './App.css'

/* Import components */
import Header from '../components/Header/Header';
import Champions from '../components/Champions/Champions';

function App() {
  return (
    <div className="champions">
      <Header />
      <Champions />
    </div>
  );
}

export default App;
