import React from 'react';
import './App.css';
import Search from './Search';
import MapUI from './MapUI';
import googleApiKey from './private'

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
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`
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
          <div class="titlefull">
            <div class='title'>
              <h1> Compost Share </h1>
            </div>
            <div class="subtitle">
              <div id="subtitle-heading"> Find a Compost Location Near You! </div>
              <p id="subtitle-body"> Inspiration: Due to coronavirus budget cuts, New York City will be suspending curbside composting beginning on May 4, 2020 and ending in June 2021. Residents will no longer be able to discard food scraps and yard waste as compost and compostable items must be collected as garbage. Compost Share connects those with backyard or personal compost bins with those who want to continue to compost the waste from their homes. </p>
            </div>
          </div>
        </header>

        <MapUI mapScript={this.getGoogleMapScript()} locations={this.state.locations} searchLocation={this.state.searchLocation} showSearchLocation={this.state.showSearchLocation} />
        <Search updateLocation={(locations) => this.updateLocations(locations)} updateSearchLocation={(latlng) => this.updateSearchLocation(latlng)} updateShowSearchLocation={(show) => this.updateShowSearchLocation(show)} />
	<p> </p>
      </div>
    )
  }

}

export default App;
