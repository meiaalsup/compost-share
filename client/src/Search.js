import React from 'react';
import './Search.css';
import AddressForm from './AddressForm.js';


class Search extends React.Component {
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

  render() {
    return ( 
      <div>
        <AddressForm />
        <button onClick={() => 
            this.search()
        }>Search</button>

      </div>
    )
  }

}


export default Search;
