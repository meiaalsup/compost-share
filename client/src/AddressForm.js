import React from 'react';

class AddressForm extends React.Component {

  render() {
    return ( 
      <div>
	<form>
  	  <label htmlFor="street">Street:</label>
  	  <input type="text" id="street" name="street"/><br/>
  	  <label htmlFor="city">City:</label>
  	  <input type="text" id="city" name="city"/>
	  <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state"/>
	  <label htmlFor="zip">Zip Code:</label>
          <input type="text" id="zip" name="zip"/>
	</form>
    </div>
  )
 }
}

export default AddressForm
