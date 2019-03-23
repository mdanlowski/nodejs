import React, { Component } from 'react';
// import axios from "axios";
import TodosDatArr from "./TodosDatArr"

export default class App2 extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    };
    this.getDataFromDb = this.getDataFromDb.bind(this);
  }

  componentDidMount(){
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 2000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }


  getDataFromDb = () => {
    let data_ = []
    fetch("http://localhost:3001/api/getData")
      .then(data => {
        return data.json()
      }).then(res => {
        for(let k of Object.keys(res)){
          data_.push(res[k]);
        }
        // console.log(typeof(data_))
        this.setState({ data: data_ });
        // console.log(this.state.data)

      });
  }

  // this.state.data
  render(){
    return(
      <div>
        <h1 className="jumbotron">Datayy lmao</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Filename</th>
              <th colSpan="2">Contents</th>
            </tr>
          </thead>
          <tbody>
            { console.log(this.state.data)}
            <TodosDatArr arrdata={this.state.data} />
          </tbody>
        </table>
      </div>
    );
  }


}