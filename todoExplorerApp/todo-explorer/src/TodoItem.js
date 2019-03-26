import React, { Component } from 'react';

export default class TodoItem extends Component {
  // constructor(props){
  //   super();
  // }

  render(){
    // console.log(this.props.arrdata)
    let nums = Object.keys(this.props.fdata).toString().split(",");
    // let lines = this.props.fdata;
    // console.log("FDATALINES:\n",lines);
    
    return(
      <tr>
        <td>{this.props.id_}</td>
        {/* <td title={this.props.fname}>{this.props.fname.substr(0,40)+"..."}</td> */}
        <td title={this.props.fname}>
          <em>{this.props.fname}</em>
        </td>
        <td colSpan="4">
          <TodoLines key={(this.props.id + Math.random()).toString()}
            lineNumbers={nums}
            lines={this.props.fdata}
          />
        </td>
      </tr>
    );
  }
}

class TodoLines extends Component {
  render(){
    
    return (
      this.props.lineNumbers.map((lineNum,i) => 
        <code>
          <li key={i} style={{listStyleType: "none"}}>
            {lineNum.padStart(3, "0") + "|"} {this.props.lines[lineNum]}
          </li>
        </code>
      )      
    )
  }
}