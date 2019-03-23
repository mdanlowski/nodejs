import React, { Component } from 'react';

export default class TodoItem extends Component {
  // constructor(props){
  //   super();
  // }

  render(){
    // console.log(this.props.arrdata)
    return(
      <tr>
        <td>{this.props.id_}</td>
        <td>{this.props.fname}</td>
        <td>{this.props.fdata.toString()}</td>
      
      </tr>
    );
  }
}
