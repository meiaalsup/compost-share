import React from 'react';
import './Search.css';

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {
        street: "70 Massachusetts Ave",
        city: "Cambridge",
        state: "MA",
        zipcode: "02139"
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
      }
    };
  }

  addlocation() {
    console.log(this.state.query)
    let json = JSON.stringify({
      address: this.state.address,
    });
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
        <p>{"Add Location"}</p>
        <button onClick={() => 
            this.addlocation()
        }>AddLocation</button>

      </div>
    )
  }

}

export default AddLocation;

