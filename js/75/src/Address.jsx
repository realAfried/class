import { Component } from 'react';

export default class Address extends Component {


  constructor(props) {
    super(props);
    this.street = 'Street'
    this.city = 'City'
    this.states = 'State'
    this.zip = 'Zip'



  }


  render() {
    const { street, city, states, zip } = this.props;
    return (
      <>
        <h3>{street? street :this.street }</h3>
        <h3>{city ||this.city} {states || this.states} {zip ||this.zip}</h3>
      </>
    );
  }
}
