import React from 'react';
import './App.css';
import Search from './Search';
import AddLocation from './AddLocation';
import MapUI from './MapUI';
import apiKey from './private'

class App extends React.Component {

  getGoogleMapScript() {
    console.log(apiKey)
    let mapsScript = document.getElementById("gMapsScript")
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    return mapsScript
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Compost Share </h1>
        </header>

        <Search />
        <MapUI mapScript={this.getGoogleMapScript()} locations={[
        {lat: -34.397,
          lng: 150.644},
        {lat: -34.15452,
          lng: 145.75346}
      
        ]}/>
        <AddLocation />
      </div>
    )
  }

}

export default App;
