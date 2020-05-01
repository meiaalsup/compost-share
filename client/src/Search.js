import React from 'react';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "70 Massachusetts Ave",
    };
  }

  search() {
    console.log(this.state.query)
    let json = JSON.stringify({query: this.state.query});
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
        <p>{"Search"}</p>
        <button onClick={() => 
            this.search()
        }>Search</button>

      </div>
    )
  }

}


export default Search;

