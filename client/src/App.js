import React from 'react';
import './App.css';
import Search from './Search';
import AddLocation from './AddLocation';
import MapUI from './MapUI';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Compost Share </h1>
      </header>

      <MapUI />
      <Search />
      <p> </p>
      <AddLocation />
    </div>
  );
}

export default App;
