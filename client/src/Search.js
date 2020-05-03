import React from 'react';
import './Search.css';
import { SERVER_URL } from './config';
import Geocode from "react-geocode";
import {geocodeApiKey} from './private'

Geocode.setApiKey(geocodeApiKey);
Geocode.setLanguage("en");
Geocode.setRegion("en");

class Search extends React.Component {

  updateState() {
    return {
      address: {
        street:  document.getElementById('search_street').value,
        city: document.getElementById('search_city').value,
        state: document.getElementById('search_state').value,
        zipcode: document.getElementById('search_zip').value
      },
      foodscraps: {
        fruit: document.getElementById('fruit').checked,
        meat:document.getElementById('meat').checked,
        dairy:document.getElementById('dairy').checked,
        yard:document.getElementById('yard').checked
      },
      availability: {
        monday_morn: document.getElementById('search_mon_morn').checked,
        monday_aft: document.getElementById('search_mon_aft').checked,
        monday_eve: document.getElementById('search_mon_eve').checked,
        tuesday_morn: document.getElementById('search_tues_morn').checked,
        tuesday_aft: document.getElementById('search_tues_aft').checked,
        tuesday_eve: document.getElementById('search_tues_eve').checked,
        wed_morn: document.getElementById('search_wed_morn').checked,
        wed_aft: document.getElementById('search_wed_aft').checked,
        wed_eve: document.getElementById('search_wed_eve').checked,
        thurs_morn: document.getElementById('search_thurs_morn').checked,
        thurs_aft: document.getElementById('search_thurs_aft').checked,
        thurs_eve: document.getElementById('search_thurs_eve').checked,
        fri_morn: document.getElementById('search_fri_morn').checked,
        fri_aft: document.getElementById('search_fri_aft').checked,
        fri_eve: document.getElementById('search_fri_eve').checked,
        sat_morn: document.getElementById('search_sat_morn').checked,
        sat_aft: document.getElementById('search_sat_aft').checked,
        sat_eve: document.getElementById('search_sat_eve').checked,
        sun_morn: document.getElementById('search_sun_morn').checked,
        sun_aft: document.getElementById('search_sun_aft').checked,
        sun_eve: document.getElementById('search_sun_eve').checked,
      },
    };
  }


  search() {
    let state = this.updateState()
    let checkedSomething = false;
    for (const [key, value] of Object.entries(state.availability)) {
      console.log(key, value)
      if (value) {
        checkedSomething = true;
      }
    } 
    let foodCheckedSomething = false;
    for (const [key, value] of Object.entries(state.foodscraps)) {
      if (value) {
        foodCheckedSomething = true;
      }
    } 
    if (checkedSomething && foodCheckedSomething) {
      let json = JSON.stringify(state)
      console.log(json)
      console.log(SERVER_URL)
      fetch(SERVER_URL + "/search", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(response => response.json())
        .then(json => {
          console.log('response from search: ' + json)
          if ((json || []).length === 0) {
            window.alert("ERROR: We cannot find any locations near you!");
          } else {
            console.log(state.address)
            Geocode.fromAddress(state.address.street + state.address.city + state.address.state + state.address.zipcode).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log("search LATLNG:" + lat, lng)
                this.props.updateSearchLocation({lat:lat,lng:lng})
		this.props.updateShowSearchLocation(true)
                this.props.updateLocation(json) 
              },
              error => {
                console.error(error);
                window.alert("ERROR: Could not locate the entered address, please try again");
              });
          }
        })
        .catch(e => {
          console.log('There has been a problem with your fetch operation: ' + e.message);
        });
    } else {
      window.alert("ERROR: Please select at least one availability time and at least one compost type");
    }
  }



  deletelocation() {
    let street = document.getElementById('search_street').value;
    let city = document.getElementById('search_city').value;
    let state = document.getElementById('search_state').value;
    let zip = document.getElementById('search_zip').value;
    let data = {
      address: {
        street: street,
        city: city,
        state: state,
        zipcode: zip,
      }
    }
    Geocode.fromAddress(street + city + state + zip).then(
      response => {
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
	    this.props.updateShowSearchLocation(false)
            this.props.updateLocation(json)
          })
          .catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
          });
      },
      error => {
        console.error(error);
        window.alert("ERROR: Could not locate the entered address, please try again");
      });
  }


  addlocation() {
    let street = document.getElementById('search_street').value;
    let city = document.getElementById('search_city').value;
    let state = document.getElementById('search_state').value;
    let zip = document.getElementById('search_zip').value;
    Geocode.fromAddress(street + city + state + zip).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

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
            fruit: document.getElementById('fruit').checked,
            meat:document.getElementById('meat').checked,
            dairy:document.getElementById('dairy').checked,
            yard:document.getElementById('yard').checked
          },
          availability: {
            monday_morn: document.getElementById('search_mon_morn').checked,
            monday_aft: document.getElementById('search_mon_aft').checked,
            monday_eve: document.getElementById('search_mon_eve').checked,
            tuesday_morn: document.getElementById('search_tues_morn').checked,
            tuesday_aft: document.getElementById('search_tues_aft').checked,
            tuesday_eve: document.getElementById('search_tues_eve').checked,
            wed_morn: document.getElementById('search_wed_morn').checked,
            wed_aft: document.getElementById('search_wed_aft').checked,
            wed_eve: document.getElementById('search_wed_eve').checked,
            thurs_morn: document.getElementById('search_thurs_morn').checked,
            thurs_aft: document.getElementById('search_thurs_aft').checked,
            thurs_eve: document.getElementById('search_thurs_eve').checked,
            fri_morn: document.getElementById('search_fri_morn').checked,
            fri_aft: document.getElementById('search_fri_aft').checked,
            fri_eve: document.getElementById('search_fri_eve').checked,
            sat_morn: document.getElementById('search_sat_morn').checked,
            sat_aft: document.getElementById('search_sat_aft').checked,
            sat_eve: document.getElementById('search_sat_eve').checked,
            sun_morn: document.getElementById('search_sun_morn').checked,
            sun_aft: document.getElementById('search_sun_aft').checked,
            sun_eve: document.getElementById('search_sun_eve').checked,
          },
        };

        let json = JSON.stringify(data)
        console.log(json)
        fetch(SERVER_URL + "/addlocation", {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json"
          },
        })
          .then(response => response.json())
          .then(json => {
            console.log(json)
	    this.props.updateShowSearchLocation(false)
	    this.props.updateLocation(json)
          })
          .catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
          });

      },
      error => {
        console.error(error);
        window.alert("ERROR: Could not locate the entered address, please try again");
      }
    );
  }

  updatelocation() {
    let street = document.getElementById('search_street').value;
    let city = document.getElementById('search_city').value;
    let state = document.getElementById('search_state').value;
    let zip = document.getElementById('search_zip').value;
    Geocode.fromAddress(street + city + state + zip).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

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
            fruit: document.getElementById('fruit').checked,
            meat:document.getElementById('meat').checked,
            dairy:document.getElementById('dairy').checked,
            yard:document.getElementById('yard').checked
          },
          availability: {
            monday_morn: document.getElementById('search_mon_morn').checked,
            monday_aft: document.getElementById('search_mon_aft').checked,
            monday_eve: document.getElementById('search_mon_eve').checked,
            tuesday_morn: document.getElementById('search_tues_morn').checked,
            tuesday_aft: document.getElementById('search_tues_aft').checked,
            tuesday_eve: document.getElementById('search_tues_eve').checked,
            wed_morn: document.getElementById('search_wed_morn').checked,
            wed_aft: document.getElementById('search_wed_aft').checked,
            wed_eve: document.getElementById('search_wed_eve').checked,
            thurs_morn: document.getElementById('search_thurs_morn').checked,
            thurs_aft: document.getElementById('search_thurs_aft').checked,
            thurs_eve: document.getElementById('search_thurs_eve').checked,
            fri_morn: document.getElementById('search_fri_morn').checked,
            fri_aft: document.getElementById('search_fri_aft').checked,
            fri_eve: document.getElementById('search_fri_eve').checked,
            sat_morn: document.getElementById('search_sat_morn').checked,
            sat_aft: document.getElementById('search_sat_aft').checked,
            sat_eve: document.getElementById('search_sat_eve').checked,
            sun_morn: document.getElementById('search_sun_morn').checked,
            sun_aft: document.getElementById('search_sun_aft').checked,
            sun_eve: document.getElementById('search_sun_eve').checked,
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
            this.props.updateShowSearchLocation(false)
            this.props.updateLocation(json) 
	 })
          .catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
          });

      },
      error => {
        console.error(error);
        window.alert("ERROR: Could not locate the entered address, please try again");

      }
    );
  }



  render() {
    return ( 
      <div>
        <div className="button-container">
          <button className="map-button" id="search" onClick={() =>
              this.search()
            }>
            Search for DropOff
          </button>
          <div className="location-container">
            <button className="map-button location" onClick={() =>
                this.addlocation()
              }>
              Add Compost Dropoff Location!
            </button>
            <button className="map-button location" onClick={() =>
                this.updatelocation()
              }>
              Update Dropoff Location
            </button>
            <button className="map-button location" onClick={() =>
                this.deletelocation()
              }>
              Remove Location
            </button>
          </div>
        </div>
        <div className="input">
          <div className="Search" id="AddressSearch">
            <div className="SearchHeading">
              Address
            </div>
            <form>
              <label htmlFor="search_street">Street:</label>
              <input type="text" id="search_street" name="search_street"/><br/>
              <label htmlFor="search_city">City:</label>
              <input type="text" id="search_city" name="search_city"/>
              <label htmlFor="search_state">State:</label>
              <input type="text" id="search_state" name="search_state"/>
              <label htmlFor="search_zip">Zip Code:</label>
              <input type="text" id="search_zip" name="search_zip"/>
            </form>
          </div>
          <div className="SearchFilters">
            <div className="Search" id="AvailabilitySearch">
              <div className="SearchHeading">
                Availability
              </div>
              <div className="AvailabilityRow">
                Mon: 
                <input type="checkbox" id="search_mon_morn" name="search_mon_morn"/>
                <label htmlFor="search_mon_morn">8am-12pm </label>
                <input type="checkbox" id="search_mon_aft" name="search_mon_aft"/>
                <label htmlFor="search_mon_aft">12pm-4pm </label>
                <input type="checkbox" id="search_mon_eve" name="search_mon_eve"/>
                <label htmlFor="search_mon_eve">4pm-8pm </label>
              </div>

              <div>
                <div className="AvailabilityRow">
                  Tue:
                  <input type="checkbox" id="search_tues_morn" name="search_tues_morn"/>
                  <label htmlFor="search_tues_morn">8am-12pm </label>
                  <input type="checkbox" id="search_tues_aft" name="search_tues_aft"/>
                  <label htmlFor="search_tues_aft">12pm-4pm </label>
                  <input type="checkbox" id="search_tues_eve" name="search_tues_eve"/>
                  <label htmlFor="search_tues_eve">4pm-8pm </label>
                </div>
              </div>
              <div>
                <div className="AvailabilityRow">
                  Wed:
                  <input type="checkbox" id="search_wed_morn" name="search_wed_morn" />
                  <label htmlFor="search_wed_morn">8am-12pm </label>
                  <input type="checkbox" id="search_wed_aft" name="search_wed_aft" />
                  <label htmlFor="search_wed_aft">12pm-4pm </label>
                  <input type="checkbox" id="search_wed_eve" name="search_wed_eve" />
                  <label htmlFor="search_wed_eve">4pm-8pm </label>
                </div>
              </div>
              <div>
                <div className="AvailabilityRow">
                  Thu:
                  <input type="checkbox" id="search_thurs_morn" name="search_thurs_morn" />
                  <label htmlFor="search_thurs_morn">8am-12pm </label>
                  <input type="checkbox" id="search_thurs_aft" name="search_thurs_aft" />
                  <label htmlFor="search_thurs_aft">12pm-4pm </label>
                  <input type="checkbox" id="search_thurs_eve" name="search_thurs_eve" />
                  <label htmlFor="search_thurs_eve">4pm-8pm </label>
                </div>
              </div>
              <div>
                <div className="AvailabilityRow">
                  Fri:
                  <input type="checkbox" id="search_fri_morn" name="search_fri_morn" />
                  <label htmlFor="search_fri_morn">8am-12pm </label>
                  <input type="checkbox" id="search_fri_aft" name="search_fri_aft" />
                  <label htmlFor="search_fri_aft">12pm-4pm </label>
                  <input type="checkbox" id="search_fri_eve" name="search_fri_eve" />
                  <label htmlFor="search_fri_eve">4pm-8pm </label>
                </div>
              </div>
              <div>
                <div className="AvailabilityRow">
                  Sat:
                  <input type="checkbox" id="search_sat_morn" name="search_sat_morn" />
                  <label htmlFor="search_sat_morn">8am-12pm </label>
                  <input type="checkbox" id="search_sat_aft" name="search_sat_aft" />
                  <label htmlFor="search_sat_aft">12pm-4pm </label>
                  <input type="checkbox" id="search_sat_eve" name="search_sat_eve" />
                  <label htmlFor="search_sat_eve">4pm-8pm </label>
                </div>
              </div>
              <div>
                <div className="AvailabilityRow">
                  Sun:
                  <input type="checkbox" id="search_sun_morn" name="search_sun_morn" />
                  <label htmlFor="search_sun_morn">8am-12pm </label>
                  <input type="checkbox" id="search_sun_aft" name="search_sun_aft" />
                  <label htmlFor="search_sun_aft">12pm-4pm </label>
                  <input type="checkbox" id="search_sun_eve" name="search_sun_eve" />
                  <label htmlFor="search_sun_eve">4pm-8pm </label>
                </div>  
              </div>
            </div>
            <div className="Search" id="AddressSearch">
              <div className="SearchHeading">
                Types of Compost
              </div>
              <div id="CompostTypeSearch">
                <input type="checkbox" id="fruit" name="fruit" />
                <label htmlFor="fruit">Fruit/Vegetables   </label>
                <input type="checkbox" id="dairy" name="dairy" />
                <label htmlFor="dairy">Dairy   </label>
                <input type="checkbox" id="meat" name="meat" />
                <label htmlFor="meat">Meat   </label>
                <input type="checkbox" id="yard" name="yard" />
                <label htmlFor="yard">Yard Waste</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}


export default Search;
