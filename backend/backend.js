const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fs = require('fs')
const axios = require('axios');
const mysql = require('mysql');
var personarray = new Array();


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 80,
  password: "root",
  database: "person",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
var con2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 80,
  database: "person",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
var con3 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 80,

  database: "person",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
var con4 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 80,

  database: "person",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
var finduser = function (id, callback) {
  personarray.forEach((element, index, array) => {
    if(element.id == id){
    console.log(element.id);
    return callback(null, element);
    }
  });
};


con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    personarray = result
  });
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post("/index.js", function (req, res) {
  const personiNFO = req.body
  console.log(req)
  console.log(req.body)
  res.end(personiNFO)
});


app.post('/user', (req, res)=>{
const name = req.body.name
const address = req.body.address
const status = req.body.status
const id = req.body.id
con2.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO `users` (`name`, `address`,`status`,`id`) VALUES ('"+name+"','"+ address+"','"+status+"','"+id+"')";
   con2.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

}); 

app.get('/users', (req, res)=>{
  res.header('Content-Type', 'application/json')
  res.send(JSON.stringify(personarray))
}); 

app.get('/users/:id', (req, res)=>{
  var id = req.params.id;
  finduser(id, function(error, id) {
    if (error) return next(error);
     res.send(id);
  });
}); 

app.get('/', (req, res)=>{
  fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
});

}); 
 const getobject = (ids, callback)=>{
   return con4.connect(function(err) {
    if (err) throw err;
    con4.query("SELECT * FROM users WHERE id = ('"+ids.id+"')", function (err, result, fields) {
      if (err) throw err;
      return callback(null, result[0]);
    });
  });
}
app.put('/user/:id/:status', function (req, res) {
      var data = []

  var id = req.params.id;
  var Status = req.params.status;
  finduser(id, function(error, id) {
    if (error) return next(error);
    con3.connect(function(err) {
      if (err) throw err;
      var sql = "UPDATE users SET status = ('"+Status+"') WHERE id = ('"+id.id+"')";
      con3.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");

        getobject(id, function(error, id) {
          if (error) return next(error);
          res.header('Content-Type', 'application/json')
           res.send(JSON.stringify(id));
        });
      });
    });
  });
}); 


app.listen(80) 