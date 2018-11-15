import React, { Component } from 'react';


const componentStyle={
  height: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",

}
const headerStyle = {}
const titleStyle={}
const subtitleStyle={
  fontSize: "24px",
  width: "60vw",
}


class HomePage extends Component {

  render(){
    return (
      <div style={componentStyle}>
        <div style={headerStyle}>
            <h3 style={titleStyle} >Welcome to Replenisher</h3>
            <h4 style={subtitleStyle}>Click on Login, Signup, or Dashboard in the navigation bar to get started!</h4>
        </div>
      </div>
      );
  }
}

export default HomePage;