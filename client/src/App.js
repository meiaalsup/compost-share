import React from 'react';
import './App.css';
import Search from './Search';
import AddLocation from './AddLocation';
import MapUI from './MapUI';
import apiKey from './private'

class App extends React.Component {

  constructor(props) {
    super(props);
    console.log(process.env.NODE_ENV)
    this.state = {
      locations: [],
    searchLocation: {
          latlng: {
            lat: 37.4748,
            lng: -121.896,
          },
}
}  
}
  getGoogleMapScript() {
    console.log(apiKey)
    let mapsScript = document.getElementById("gMapsScript")
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    return mapsScript
  }

  updateLocations(locations) {
    this.setState({locations: locations})
  }


  updateSearchLocation(latlng) {
    console.log("update search location: " + latlng.lat)
    this.setState({searchLocation: {latlng:latlng}})
    console.log("updted search location: " + this.state.searchLocation.latlng.lat)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Compost Share </h1>
        </header>

        <MapUI mapScript={this.getGoogleMapScript()} locations={this.state.locations} searchLocation={this.state.searchLocation} />
        <Search updateLocation={(locations) => this.updateLocations(locations)} updateSearchLocation={(latlng) => this.updateSearchLocation(latlng)} />
	<p> </p>
      </div>
    )
  }

}

export default App;
