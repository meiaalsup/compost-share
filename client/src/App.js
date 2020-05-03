import React from 'react';
import './App.css';
import Search from './Search';
import MapUI from './MapUI';
import apiKey from './private'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      searchLocation: {
          latlng: {
            lat: 37.4748,
            lng: -121.896,
          },
	},
    showSearchLocation: false
  }  
}
  getGoogleMapScript() {
    let mapsScript = document.getElementById("gMapsScript")
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    return mapsScript
  }

  updateLocations(locations) {
    this.setState({locations: locations})
  }


  updateSearchLocation(latlng) {
    this.setState({searchLocation: {latlng:latlng}})
  }

  updateShowSearchLocation(show) {
    this.setState({showSearchLocation: show});
    console.log('in app: ' + show);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Compost Share </h1>
        </header>

        <MapUI mapScript={this.getGoogleMapScript()} locations={this.state.locations} searchLocation={this.state.searchLocation} showSearchLocation={this.state.showSearchLocation} />
        <Search updateLocation={(locations) => this.updateLocations(locations)} updateSearchLocation={(latlng) => this.updateSearchLocation(latlng)} updateShowSearchLocation={(show) => this.updateShowSearchLocation(show)} />
	<p> </p>
      </div>
    )
  }

}

export default App;
