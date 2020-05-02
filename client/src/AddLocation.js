import React from 'react';
import './AddLocation.css';
//import Geocode from "react-geocode";
//Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
//Geocode.setLanguage("en");
//Geocode.setRegion("en");

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
  }

 updateState() {
   // Get latidude & longitude from address.
   let street = document.getElementById('add_street').value;
   let city = document.getElementById('add_city').value;
   let state = document.getElementById('add_state').value;
   let zip = document.getElementById('add_zip').value;
//   Geocode.fromAddress(street + city + state + zip).then(
//   response => {
//     const { lat, lng } = response.results[0].geometry.location;
//     console.log(lat, lng);
//   },
//   error => {
//     console.error(error);
//   }
//   );


    return {
      address: {
        street: street,
        city: city,
        state: state,
        zipcode: zip
      },
      foodscraps: {
        vegetables: true
      },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    };
  }

  addlocation() {
    let state = this.updateState()
    let json = JSON.stringify(state) 
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
  }

  render() {
    return ( 
      <div>
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
       <button onClick={() => 
            this.addlocation()
        }>addLocation</button>

      </div>
    )
  }

}

export default AddLocation;

