import React from 'react';
import './MapUI.css'

const displayString = {
  monday_morn: "Monday Morning",
  monday_aft: "Monday Afternoon",
  monday_eve: "Monday Evening",
  tuesday_morn: "Tuesday Morning",
  tuesday_aft: "Tuesday Afternoon",
  tuesday_eve: "Tuesday Evening",
  wed_morn: "Wednesday Morning",
  wed_aft: "Wednesday Afternoon",
  wed_eve: "Wednesday Evening",
  thurs_morn: "Thursday Morning",
  thurs_aft: "Thursday Afternoon",
  thurs_eve: "Thursday Evening",
  fri_morn: "Friday Morning",
  fri_aft: "Friday Afternoon",
  fri_eve: "Friday Evening",
  sat_morn: "Saturday Morning",
  sat_aft: "Saturday Afternoon",
  sat_eve: "Saturday Evening",
  sun_morn: "Sunday Morning",
  sun_aft: "Sunday Afternoon",
  sun_eve: "Sunday Evening"
}

const foodDisplayString = {
  fruit: "Fruits/Vegetables",
  dairy: "Dairy",
  meat: "Meat",
  yard: "Yard Waste"
}

const DEFAULT_CENTER = {
  lat: 37.869,
  lng: -122.264
}

class MapUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // map will be here, but we don't initialize until component mounts
      markers: [],
    };
  }


  componentDidMount() {
    this.props.mapScript.addEventListener('load', () => {
      let map = new window.google.maps.Map(
        document.getElementById('map'), {
          center: DEFAULT_CENTER,
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
      this.state.map.setCenter(marker.getPosition());
      let infowindow = new window.google.maps.InfoWindow({  

        content: this.createContent(location)
      })
      infowindow.open(this.state.map, marker)
    })

    return marker
  }

  createContent(location) {
    let foodList = [];
    let thing = Object.keys(location.foodscraps)
    for (let i = 0; i < thing.length; ++i) {
      let k = thing[i]
      console.log(k, location.foodscraps[k]);
      if (location.foodscraps[k]) {
        foodList.push(foodDisplayString[k]);
      }
    }
    let foodString = foodList.join(", ");

    let availabilityList = [];
    let stuff = Object.keys(location.availability)
    for (let i = 0; i < stuff.length; ++i) {
      let key = stuff[i]
      console.log(key, location.availability[key]);
      if (location.availability[key]) {
        availabilityList.push(displayString[key]);
      }
    }
    let availabilityString = availabilityList.join(", ");

    return '<b> ' + location.address.street + ", " + 
      location.address.city + ", " + 
      location.address.state + ", " + 
      location.address.zipcode + "</b>" +   
      "<br /> <p></p> Permitted Food Scraps: " + 
      foodString + "<br /> <p></p> Availability: " + 
      availabilityString;

  }

  addMarkers() {
    this.state.markers.forEach(
      (marker) => {marker.setMap(null)}
    )

    if (this.props.showSearchLocation || this.props.locations.length === 0) {
    	this.state.map.setCenter(this.props.searchLocation.latlng)
    } else {
	this.state.map.setCenter(this.props.locations[0].address.latlng)
    }
    let newMarkers = this.props.locations.map((location) => this.createMarker(location))
    console.log(this.props)	
    if (this.props.locations.length > 0 && this.props.showSearchLocation) {
        let searchMarker = new window.google.maps.Marker({
      position: this.props.searchLocation.latlng,
      map: this.state.map,
      icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new window.google.maps.Size(45, 45)
        }
    });
     searchMarker.addListener('click', () => {
      this.state.map.setCenter(searchMarker.getPosition());
      let infowindow = new window.google.maps.InfoWindow({

        content: 'Your Location'
      })
      infowindow.open(this.state.map, searchMarker)
    })
    newMarkers.push(searchMarker);
    }
    this.setState({
      markers: newMarkers
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
