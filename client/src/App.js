import React from 'react';
import './App.css';
import Search from './Search';
import AddLocation from './AddLocation';
import MapUI from './MapUI';
import apiKey from './private'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [
      {
        lat: -34.597,
        lng: 150.644,
        foodscraps: {
          vegetables: true
        }
      },
      {
        lat: -34.397,
        lng: 150.644,
        foodscraps: {
          vegetables: true
        }
      },
      {
        lat: -34.15452,
        lng: 150.614,
        foodscraps: {
          vegetables: false
        }
      },
    ]}
  }
  
  getGoogleMapScript() {
    console.log(apiKey)
    let mapsScript = document.getElementById("gMapsScript")
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    return mapsScript
  }

  updateLocations(locations) {
    this.setState({location: locations})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Compost Share </h1>
        </header>

        <MapUI mapScript={this.getGoogleMapScript()} locations={this.state.locations} />
        <Search updateLocation={(locations) => this.updateLocations(locations)} />
	<p> </p>
        <AddLocation />
      </div>
    )
  }

}

export default App;
