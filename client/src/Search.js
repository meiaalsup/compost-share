import React from 'react';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

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
        <button onClick={() => 
            this.search()
        }>Search</button>

      </div>
    )
  }

}


export default Search;
