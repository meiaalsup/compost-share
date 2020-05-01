import React from 'react';
import './Search.css';

class Search extends React.Component {
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
      },
    };
  }

  search() {
    let json = JSON.stringify(this.state);
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
        <p>{"Search"}</p>
        <button onClick={() => 
            this.search()
        }>Search</button>

      </div>
    )
  }

}


export default Search;
