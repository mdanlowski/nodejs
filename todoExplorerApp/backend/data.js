// DATABASE Cfg
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    contents: Object,
    path: String
  },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);

// { 
//   "_id" : 1, 
//   "contents" : { 
//     "14" : "def excluded_folders(): ### @TODO\n" 
//   },
//  "file_path" : "C:/Users/marcin.danlowski/GIT/TODOExplorer/lib.py"
// }