import React from 'react';
import './App.css'

/* Import components */
import Champions from './components/champions/Champions';

function App() {
  return (
    <div className="champions">
      <h1>LOL CHAMPIONS</h1>
      <Champions />
    </div>
  );
}

export default App;
