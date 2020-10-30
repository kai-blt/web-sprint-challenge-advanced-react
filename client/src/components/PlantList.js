import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super();
    this.state = {
      plants: [],
      filter: ''
    };
  }  

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount() {
    axios.get('http://localhost:3333/plants')
      .then(res => {
        this.setState({plants: res.data.plantsData})
      })
      .catch(err => {
        console.log(err.errors);
      })
  }



  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">        
      {/*Added filter option to plants list! It makes both values case insensitive by
      making both the user typed in value and the name of the plant read from the
      mapped value to lower case*/}
        <label htmlFor="search">Search:</label>        
        <input
          name="search"
          value={this.state.filter}
          onChange={e => this.setState({filter: e.target.value.toLowerCase()})}
        />
        {this.state?.plants?.filter(plant => plant.name.toLowerCase().includes(this.state.filter)).map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
