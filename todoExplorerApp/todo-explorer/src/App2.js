import React, { Component } from 'react';
import axios from "axios";
import TodosDatArr from "./TodosDatArr"

export default class App2 extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,

      contents: {},
      fPath: ""
    };
    this.getDataFromDb = this.getDataFromDb.bind(this);
    // this.putDataToDB = this.putDataToDB.bind(this);
    this.handleFilenameChange = this.handleFilenameChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
  }

  componentDidMount(){
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 4000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }


  /*=============REST CLIENT============= */
  getDataFromDb = () => {
    let data_ = []
    fetch("http://localhost:3001/api/getData")
      .then(data => {
        // console.log(data);
        // console.log(data.json());       
        return data.json();
      }).then(res => {
        for(let k of Object.keys(res)){
          data_.push(res[k]);
        }
        // console.log(typeof(data_))
        this.setState({ data: data_ });
        // console.log(this.state.data)
        // console.log(this.state.data.length)

      });
  }

  putDataToDB = payload => {
    let idToBeAdded = this.state.data.length;

    axios.post("http://localhost:3001/api/postData", {
      __id: ++idToBeAdded,
      _contents: this.state.contents,
      _fPath: this.state.fPath
    });
  };
  
  
  // handle inputs
  handleFilenameChange(event){
    let newFilename = event.target.value;
    this.setState(prevState => {
      return prevState["fPath"] = newFilename;
    });
  }

  handleTextareaChange(event){
    let rawContents = event.target.value;
    let newContents;
    if(rawContents.length > 0){
      try {
        newContents = JSON.parse(rawContents);
      }
      catch (Exception) {
        console.log(Exception);
      }
    }
    this.setState(prevState => {
      return prevState["contents"] = newContents;
    });
  }

  render(){
    return(
      <div>
        <h1 className="jumbotron">TODOExplorer - All code tasks in one place</h1>
        <div>
          <form style={{width: 500}}>
            <input
              className="form-control" type="text" placeholder="Path to file" 
              onChange={(event) => this.handleFilenameChange(event)}
              />
            <textarea
              className="form-control" id="todosBody" placeholder="Todos, e.g.: 1: buy milk" 
              onChange={(event) => this.handleTextareaChange(event)}             
              />
            <button 
              className="btn btn-success" 
              onClick={() => this.putDataToDB(this.state.message)}>
              Add new ToDo
            </button>
          </form>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Filename</th>
              <th colSpan="4">
                <div>ToDos found in the file</div>
                <code>Line No.| Message</code>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* { console.log(this.state.data)} */}
            <TodosDatArr arrdata={this.state.data} />
          </tbody>
        </table>
      </div>
    );
  }


}