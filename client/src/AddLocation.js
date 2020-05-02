import React from 'react';
import './AddLocation.css';
import AddressForm from './AddressForm.js';

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
  }

 updateState() {
    return {
      address: {
        street:  document.getElementById('street').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipcode: document.getElementById('zip').value
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
        <AddressForm/>
        <button onClick={() => 
            this.addlocation()
        }>addLocation</button>

      </div>
    )
  }

}

export default AddLocation;

