import React, { Component } from 'react';
import TodoItem from "./TodoItem"

export default class TodosDatArr extends Component {
  constructor(props){
    super();
  }

  render(){
    // console.log(this.props);
    return(
        this.props.arrdata.map(td => <TodoItem 
          key={td._id}
          id_={td._id}
          fname={td.file_path}
          fdata={td.contents}
        />
      )
    );
  }
}
// <Todo data={d} />