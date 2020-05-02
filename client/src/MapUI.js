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
        {lat: -35.15452,
         lng: 145.75346}
      ]
    };
  }

  componentDidMount() {
    this.props.mapScript.addEventListener('load', () => {
      let map = new window.google.maps.Map(
        document.getElementById('map'), 
        {center: this.state.addresses[0],
          zoom: 8}
      )
      this.setState({map: map})
    })

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

