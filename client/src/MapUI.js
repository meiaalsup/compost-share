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
          center: this.props.searchLocation.latlng,
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

    let availability_filters = "";
      for (const [key, value] of Object.entries(location.availability)) {
        if (value) {
	  let day = key.substring(0, key.indexOf("_"));
          day = day.charAt(0).toUpperCase() + day.slice(1) + ': ';  
	  let time = key.substring(key.indexOf("_")+1);
	  let dateTime = "8am-12pm";
	  if (time === "aft") {
		dateTime = "12pm-4pm";
	  } else if (time === "eve") {
		dateTime = "4pm-8pm";
  	  }
	  let i = day.concat(dateTime);
	  i = i.concat('</br>');
          availability_filters = availability_filters.concat(i);
        }
      }
    let food_filters = "";
      for (const [key, value] of Object.entries(location.foodscraps)) {
        if (value) {
	  let a = key.charAt(0).toUpperCase() + key.slice(1);
	  a = a.concat("</br> ");
          food_filters = food_filters.concat(a);
        }
      }


    let contentString = '<b>' + location.address.street + ", " + location.address.city + ", " + location.address.state + ", " + 
	location.address.zipcode + '</b>' + '<p></p>' + '<div> Availability: </div>' + availability_filters + '<p></p>' + 
        '<div> Types of Compost: </div>' + food_filters;
    
    marker.addListener('click', () => {
      this.state.map.setCenter(marker.getPosition());
      let infowindow = new window.google.maps.InfoWindow({      
        content: contentString
      })
      infowindow.open(this.state.map, marker)
    })
    
    return marker
  }

  addMarkers() {
    //this.map. // blah blah add markers

    this.state.markers.forEach(
      (marker) => {marker.setMap(null)}
    )
    this.state.map.setCenter(this.props.searchLocation.latlng)
    let newMarkers = this.props.locations.map((location) => this.createMarker(location))
    if (this.props.locations.length > 1) {
        let searchMarker = new window.google.maps.Marker({
      position: this.props.searchLocation.latlng,
      map: this.state.map,
      icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new window.google.maps.Size(45, 45)
        }
    });
    newMarkers.push(searchMarker);
    } 
    this.setState({markers: newMarkers});

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
