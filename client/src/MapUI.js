import React from 'react';

const url = "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJs1XtTiR8hYARPgqIAcP6nCo&key=AIzaSyCpRMzf69BbqeV9IuswQUXeW19VXmJ3azg"

class MapUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [
        {lat: -34.397,
        lng: 150.644},
        {lat: -35.15452,
        lng: 145.75346}
      ]
    };
  }


  render() {
    return ( 
      <div>
        <div id="map"></div>
        <script>
        var map;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), 
          { center: this.state.addresses[0]},
          zoom: 8 }
        }
        </script>
        <script  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpRMzf69BbqeV9IuswQUXeW19VXmJ3azg&callback=initMap"
        async defer></script> 
        </script>
      </div>
    )
  }

}

export default MapUI;

