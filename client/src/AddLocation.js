import React from 'react';
import './AddLocation.css';
import SERVER_URL from './config';

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCpRMzf69BbqeV9IuswQUXeW19VXmJ3azg");
Geocode.setLanguage("en");
Geocode.setRegion("en");

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {},
      foodscraps: {}
    }
  }

  deletelocation() {
    let street = document.getElementById('add_street').value;
    let city = document.getElementById('add_city').value;
    let state = document.getElementById('add_state').value;
    let zip = document.getElementById('add_zip').value;
    let data = {
      address: {
        street: street,
        city: city,
        state: state,
        zipcode: zip,
      }
    }
    let json = JSON.stringify(data)
    console.log(json)
    fetch(SERVER_URL + "/deletelocation", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
      .catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
      });
  }


  addlocation() {
    let street = document.getElementById('add_street').value;
    let city = document.getElementById('add_city').value;
    let state = document.getElementById('add_state').value;
    let zip = document.getElementById('add_zip').value;
    Geocode.fromAddress(street + city + state + zip).then(
      response => {
       const { lat, lng } = response.results[0].geometry.location;
     console.log(lat, lng);       
     let data = {
      address: {
        street: street,
        city: city,
        state: state,
        zipcode: zip,
        latlng: {
	  lat : lat,
          lng : lng
	}
      },
      foodscraps: {
        vegetables: true
      },
      availability: {
        monday_morn: document.getElementById('add_mon_morn').checked,
        monday_aft: document.getElementById('add_mon_aft').checked,
        monday_eve: document.getElementById('add_mon_eve').checked,
        tuesday_morn: document.getElementById('add_tues_morn').checked,
        tuesday_aft: document.getElementById('add_tues_aft').checked,
        tuesday_eve: document.getElementById('add_tues_eve').checked,
        wed_morn: document.getElementById('add_wed_morn').checked,
        wed_aft: document.getElementById('add_wed_aft').checked,
        wed_eve: document.getElementById('add_wed_eve').checked,
        thurs_morn: document.getElementById('add_thurs_morn').checked,
        thurs_aft: document.getElementById('add_thurs_aft').checked,
        thurs_eve: document.getElementById('add_thurs_eve').checked,
        fri_morn: document.getElementById('add_fri_morn').checked,
        fri_aft: document.getElementById('add_fri_aft').checked,
        fri_eve: document.getElementById('add_fri_eve').checked,
        sat_morn: document.getElementById('add_sat_morn').checked,
        sat_aft: document.getElementById('add_sat_aft').checked,
        sat_eve: document.getElementById('add_sat_eve').checked,
        sun_morn: document.getElementById('add_sun_morn').checked,
        sun_aft: document.getElementById('add_sun_aft').checked,
        sun_eve: document.getElementById('add_sun_eve').checked,
      },
    };

    let json = JSON.stringify(data)
    console.log(json)
    fetch("http://localhost:3000/addlocation", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
      .catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
      });

    },
    error => {
    //  console.error(error);
      window.alert("ERROR: Could not locate the entered address, please try again");
    }
    );
  }

  updatelocation() {
    let street = document.getElementById('add_street').value;
    let city = document.getElementById('add_city').value;
    let state = document.getElementById('add_state').value;
    let zip = document.getElementById('add_zip').value;
    Geocode.fromAddress(street + city + state + zip).then(
      response => {
       const { lat, lng } = response.results[0].geometry.location;
       
     let data = {
      address: {
        street: street,
        city: city,
        state: state,
        zipcode: zip,
        lat: lat,
        lng: lng,
      },
      foodscraps: {
        vegetables: true
      },
      availability: {
        monday_morn: document.getElementById('add_mon_morn').checked,
        monday_aft: document.getElementById('add_mon_aft').checked,
        monday_eve: document.getElementById('add_mon_eve').checked,
        tuesday_morn: document.getElementById('add_tues_morn').checked,
        tuesday_aft: document.getElementById('add_tues_aft').checked,
        tuesday_eve: document.getElementById('add_tues_eve').checked,
        wed_morn: document.getElementById('add_wed_morn').checked,
        wed_aft: document.getElementById('add_wed_aft').checked,
        wed_eve: document.getElementById('add_wed_eve').checked,
        thurs_morn: document.getElementById('add_thurs_morn').checked,
        thurs_aft: document.getElementById('add_thurs_aft').checked,
        thurs_eve: document.getElementById('add_thurs_eve').checked,
        fri_morn: document.getElementById('add_fri_morn').checked,
        fri_aft: document.getElementById('add_fri_aft').checked,
        fri_eve: document.getElementById('add_fri_eve').checked,
        sat_morn: document.getElementById('add_sat_morn').checked,
        sat_aft: document.getElementById('add_sat_aft').checked,
        sat_eve: document.getElementById('add_sat_eve').checked,
        sun_morn: document.getElementById('add_sun_morn').checked,
        sun_aft: document.getElementById('add_sun_aft').checked,
        sun_eve: document.getElementById('add_sun_eve').checked,
      },
    };

    let json = JSON.stringify(data)
    console.log(json)
    fetch(SERVER_URL + "/updatelocation", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
      .catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
      });

    },
    error => {
      console.error(error);
    }
    );
  }

  render() {
    return ( 
      <div>
            <div className="AddLocation">
              <header className="AddLocation-header">
                <h1> Add/Delete/Update Location For Compost Drop Off </h1>
              </header>
            </div>
        <div>
          <form>
            <label htmlFor="add_street">Street:</label>
            <input type="text" id="add_street" name="add_street"/><br/>
            <label htmlFor="add_city">City:</label>
            <input type="text" id="add_city" name="add_city"/>
            <label htmlFor="add_state">State:</label>
            <input type="text" id="add_state" name="add_state"/>
            <label htmlFor="add_zip">Zip Code:</label>
            <input type="text" id="add_zip" name="add_zip"/>
          </form>
       </div>
       <p> </p>
       <div>
          Availability (if adding or updating location)
          <div>
            <div className="AddLocation">
              <subheading className="AddLocation-day">
                <t1>Mon:</t1>
              </subheading>
              <input type="checkbox" id="add_mon_morn" name="add_mon_morn"/>
              <label htmlFor="add_mon_morn">8am-12pm </label>
              <input type="checkbox" id="add_mon_aft" name="add_mon_aft"/>
              <label htmlFor="add_mon_aft">12pm-4pm </label>
              <input type="checkbox" id="add_mon_eve" name="add_mon_eve"/>
              <label htmlFor="add_mon_eve">4pm-8pm </label>
            </div>
          </div>
          <div>
            <div className="AddLocation">
              <subheading className="AddLocation-day">
                <t1>Tue:</t1>
              </subheading>
              <input type="checkbox" id="add_tues_morn" name="add_tues_morn"/>
              <label htmlFor="add_tues_morn">8am-12pm </label>
              <input type="checkbox" id="add_tues_aft" name="add_tues_aft"/>
              <label htmlFor="add_tues_aft">12pm-4pm </label>
              <input type="checkbox" id="add_tues_eve" name="add_tues_eve"/>
              <label htmlFor="add_tues_eve">4pm-8pm </label>
            </div>
          </div>
          <div>
            <div className="AddLocation">
              <subheading className="AddLocation-day">
                <t1>Wed:</t1>
              </subheading>
              <input type="checkbox" id="add_wed_morn" name="add_wed_morn"/>
              <label htmlFor="add_wed_morn">8am-12pm </label>
              <input type="checkbox" id="add_wed_aft" name="add_wed_aft"/>
              <label htmlFor="add_wed_aft">12pm-4pm </label>
              <input type="checkbox" id="add_wed_eve" name="add_wed_eve"/>
              <label htmlFor="add_wed_eve">4pm-8pm </label>
            </div>
          </div>
          <div>
            <div className="AddLocation">
              <subheading className="AddLocation-day">
                <t1>Thu:</t1>
              </subheading>
              <input type="checkbox" id="add_thurs_morn" name="add_thurs_morn"/>
              <label htmlFor="add_thurs_morn">8am-12pm </label>
              <input type="checkbox" id="add_thurs_aft" name="add_thurs_aft"/>
              <label htmlFor="add_thurs_aft">12pm-4pm </label>
              <input type="checkbox" id="add_thurs_eve" name="add_thurs_eve"/>
              <label htmlFor="add_thurs_eve">4pm-8pm </label>
            </div>
          </div>
          <div>
            <div className="AddLocation">
              <subheading className="AddLocation-day">
                <t1>Fri:</t1>
              </subheading>
              <input type="checkbox" id="add_fri_morn" name="add_fri_morn"/>
              <label htmlFor="add_fri_morn">8am-12pm </label>
              <input type="checkbox" id="add_fri_aft" name="add_fri_aft"/>
              <label htmlFor="add_fri_aft">12pm-4pm </label>
              <input type="checkbox" id="add_fri_eve" name="add_fri_eve"/>
              <label htmlFor="add_fri_eve">4pm-8pm </label>
            </div>
          </div>
          <div>
            <div className="AddLocation">
              <subheading className="AddLocation-day">
                <t1>Sat:</t1>
              </subheading>
              <input type="checkbox" id="add_sat_morn" name="add_sat_morn"/>
              <label htmlFor="add_sat_morn">8am-12pm </label>
              <input type="checkbox" id="add_sat_aft" name="add_sat_aft"/>
              <label htmlFor="add_sat_aft">12pm-4pm </label>
              <input type="checkbox" id="add_sat_eve" name="add_sat_eve"/>
              <label htmlFor="add_sat_eve">4pm-8pm </label>
            </div>
          </div>
          <div>
            <div className="AddLocation">
              <subheading className="AddLocation-day">
                <t1>Sun:</t1>
              </subheading>
              <input type="checkbox" id="add_sun_morn" name="add_sun_morn"/>
              <label htmlFor="add_sun_morn">8am-12pm </label>
              <input type="checkbox" id="add_sun_aft" name="add_sun_aft"/>
              <label htmlFor="add_sun_aft">12pm-4pm </label>
              <input type="checkbox" id="add_sun_eve" name="add_sun_eve"/>
              <label htmlFor="add_sun_eve">4pm-8pm </label>
            </div>
          </div>
        </div>
<button onClick={() =>
            this.search()
        }>Search for DropOff</button>
       <button onClick={() => 
            this.addlocation()
        }>Add Location</button>
	<button onClick={() =>
            this.updatelocation()
        }>Update Location</button>
        <button onClick={() =>
            this.deletelocation()
        }>Delete Location</button>
      </div>
    )
  }

}

export default AddLocation;

