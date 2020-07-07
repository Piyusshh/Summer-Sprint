import React from 'react';
import '../css/Header.css';

class Header extends React.Component{
  render(){
    return(
      <div id="header">
          <h1>{this.props.content}</h1>
      </div>
    )
  }
}


export default Header;
