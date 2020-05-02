import React from 'react';
import './MapUI.css'

class MapUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // map will be here, but we don't initialize until component mounts
      addresses: [
        {lat: -34.397,
          lng: 150.644},
      ],
      markers: [],
    };
  }


  componentDidMount() {
    this.props.mapScript.addEventListener('load', () => {
      let map = new window.google.maps.Map(
        document.getElementById('map'), {
          center: this.props.locations[0].address.latlng,
          zoom: 8
        }
      )
      this.setState({map: map})
      this.addMarkers()
    })
  }

  addMarkers() {
    //this.map. // blah blah add markers

    this.state.markers.forEach((marker) => {marker.setMap(null)})
    this.state.map.setCenter(this.props.locations[0].address.latlng)
    this.setState({
      markers: this.props.locations.map(
        (location, index) => new window.google.maps.Marker({
          position: location.address.latlng,
          map: this.state.map,
        })
      )
    });

  }

  componentDidUpdate(prevProps) {
    if (this.props.locations !== prevProps.locations) {
      this.addMarkers()
    }
  }

  render() {
    return ( 
      <div id="mapWrapper">
        <div id="map"></div>
      </div>  
    )
  }
}

export default MapUI;
