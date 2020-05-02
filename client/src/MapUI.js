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

  createMarker(location) {
    
    let marker = new window.google.maps.Marker({
      position: location.address.latlng,
      map: this.state.map,
    });
    marker.addListener('click', () => {
      this.state.map.setZoom(8);
      this.state.map.setCenter(marker.getPosition());
      let infowindow = new window.google.maps.InfoWindow({      
        content: location.address.street
      })
      infowindow.open(this.state.map, marker)
      console.log("marker clicked")
    })
    
    return marker
  }

  addMarkers() {
    //this.map. // blah blah add markers

    console.log('in add markers: ' + this.props.locations[0])
    this.state.markers.forEach(
      (marker) => {marker.setMap(null)}
    )

    this.state.map.setCenter(this.props.locations[0].address.latlng)
    this.setState({
      markers: this.props.locations.map((location) => this.createMarker(location))
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
