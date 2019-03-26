// var child_process = require('child_process');
// child_process.exec('path_to_your_executables', function(error, stdout, stderr) {
//     console.log(stdout);
// }); RUNNING LOCAL FILES

// const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const cors = require('cors');

const express = require("express");
const bodyParser = require("body-parser");
// const logger = require("morgan");
// const Data = require("./data");

const API_PORT = 3001;
const app = express();
app.use(cors());
// app.use(bodyParser());
app.use(bodyParser.json());

const router = express.Router();

const dbRoute = "mongodb://127.0.0.1:27017";
const dbName = "todoExpl";

/* ============REST INTERFACE============= */
router.get('/getData', function (req, res) {
  console.log("GETdatacalled");
  var data = null;
  
  MongoClient.connect(dbRoute, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    // console.log("Connected successfully to server and database " + dbName);
    let db = client.db(dbName);
    let collection = db.collection("todos");
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      data = docs;
      res.send(data);
    });
  client.close();
  }); //db conn 
}); //get
  
router.post('/postData', function (req, res) {
  console.log("POSTdatacalled");
  // console.log(req);
  console.log(req.body);

  MongoClient.connect(dbRoute, { useNewUrlParser: true }, function(err, client) {
  
    let data = {
      _id : -1,
      contents: {},
      file_path: "",
    }

    const { __id, _contents, _fPath } = req.body;

    if ((!__id && __id !== 0) || !_contents || !_fPath) {
      console.log('error: "INVALID INPUTS"');
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }

    // get the document ready
    data._id = __id;
    data.contents = _contents;
    data.file_path = _fPath;
    
    // set collection
    let db = client.db(dbName);
    let collection = db.collection("todos");

    collection.insertOne(data);

    if (err) return res.json({ success: false, error: err });
    
    client.close();
    return res.json({ success: true });
      
  }); //db conn 

}); //post


// app.listen(process.env.PORT || API_PORT);
app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));













/*


// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

*/