import React from 'react';
import './Search.css';

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
        vegetables: true
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
    let json = JSON.stringify(state)
    console.log(json)
    fetch("http://localhost:3000/search", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.text())
      .then(json => {
        console.log(json)
      })
      .catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
      });
  }

  onChangeHandler(cb) {
	console.log(cb.value);
  }

  toggle(element) { console.log("hello");}

  render() {
    return ( 
      <div>
        <div>
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
       <div>
	  Availability
	  <div>
	  <b>Monday:</b>
	  <input type="checkbox" id="search_mon_morn" name="search_mon_morn"/>
	  <label htmlFor="search_mon_morn"> 8am-12pm</label>
	  <input type="checkbox" id="search_mon_aft" name="search_mon_aft"/>
	  <label htmlFor="search_mon_aft"> 12pm-4pm</label>
	  <input type="checkbox" id="search_mon_eve" name="search_mon_eve"/>
	  <label htmlFor="search_mon_eve"> 4pm-8pm</label>
	  </div>
          <div>
          <b>Tuesday:</b>
          <input type="checkbox" id="search_tues_morn" name="search_tues_morn"/>
          <label htmlFor="search_tues_morn"> 8am-12pm</label>
          <input type="checkbox" id="search_tues_aft" name="search_tues_aft"/>
          <label htmlFor="search_tues_aft"> 12pm-4pm</label>
          <input type="checkbox" id="search_tues_eve" name="search_tues_eve"/>
          <label htmlFor="search_tues_eve"> 4pm-8pm</label>
          </div>
	  <div>
          <b>Wednesday:</b>
          <input type="checkbox" id="search_wed_morn" name="search_wed_morn"/>
          <label htmlFor="search_wed_morn"> 8am-12pm</label>
          <input type="checkbox" id="search_wed_aft" name="search_wed_aft"/>
          <label htmlFor="search_wed_aft"> 12pm-4pm</label>
          <input type="checkbox" id="search_wed_eve" name="search_wed_eve"/>
          <label htmlFor="search_wed_eve"> 4pm-8pm</label>
          </div>
	  <div>
          <b>Thursday:</b>
          <input type="checkbox" id="search_thurs_morn" name="search_thurs_morn"/>
          <label htmlFor="search_thurs_morn"> 8am-12pm</label>
          <input type="checkbox" id="search_thurs_aft" name="search_thurs_aft"/>
          <label htmlFor="search_thurs_aft"> 12pm-4pm</label>
          <input type="checkbox" id="search_thurs_eve" name="search_thurs_eve"/>
          <label htmlFor="search_thurs_eve"> 4pm-8pm</label>
          </div>
	  <div>
          <b>Friday:</b>
          <input type="checkbox" id="search_fri_morn" name="search_fri_morn"/>
          <label htmlFor="search_fri_morn"> 8am-12pm</label>
          <input type="checkbox" id="search_fri_aft" name="search_fri_aft"/>
          <label htmlFor="search_fri_aft"> 12pm-4pm</label>
          <input type="checkbox" id="search_fri_eve" name="search_fri_eve"/>
          <label htmlFor="search_fri_eve"> 4pm-8pm</label>
          </div>
          <div>
          <b>Saturday:</b>
          <input type="checkbox" id="search_sat_morn" name="search_sat_morn"/>
          <label htmlFor="search_sat_morn"> 8am-12pm</label>
          <input type="checkbox" id="search_sat_aft" name="search_sat_aft"/>
          <label htmlFor="search_sat_aft"> 12pm-4pm</label>
          <input type="checkbox" id="search_sat_eve" name="search_sat_eve"/>
          <label htmlFor="search_sat_eve"> 4pm-8pm</label>
          </div>
 	  <div>
          <b>Sunday:</b>
          <input type="checkbox" id="search_sun_morn" name="search_sun_morn"/>
          <label htmlFor="search_sun_morn"> 8am-12pm</label>
          <input type="checkbox" id="search_sun_aft" name="search_sun_aft"/>
          <label htmlFor="search_sun_aft"> 12pm-4pm</label>
          <input type="checkbox" id="search_sun_eve" name="search_sun_eve"/>
          <label htmlFor="search_sun_eve"> 4pm-8pm</label>
          </div>	
        </div>
	<button onClick={() => 
            this.search()
        }>Search</button>

      </div>
    )
  }

}


export default Search;
