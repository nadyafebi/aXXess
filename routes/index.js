// Express Setup
var http = require('http');
var express = require('express');
var router = express.Router();

// Twilio Setup
var accountSid = 'AC7e4969825a94132e9d2684bc11ae547b';
var authToken = '7a7876cd6794a7142628ec81238f04ef';
var client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// MongoDB Setup
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://admin:1234@ds153392.mlab.com:53392/hack4humanity2017";

// Get database.
var data = [];
function getDatabase() {
  data = [];
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("help").find({}).forEach(function (result) {
    data.push(result);
  });
  /*
  db.collection("help").find({}, function(err, result) {
    if (err) throw err;
    var x = result.limit(3);
    console.log(x);
    db.close();
  });
  */
});
}
getDatabase();

// GET
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/driver', function(req, res, next) {
  res.render('driver', { title: 'Driver'});
  getDatabase();
});

router.get('/request', function(req, res, next) {
  res.render('request', { title: 'Request' });
});

router.get('/data', function(req, res, next) {
  res.send(data);
});

// POST

router.post('/sms', (req, res) => {
  // Declare variables.
  var name;
  var location;
  var str = req.body.Body;

  // Get name.
  var index = str.indexOf('.');
  name = str.slice(0, index);
  str = str.replace(name + ".", "");
  str = str.trim();

  // Get address.
  location = str;

  // Add to the database.
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = { name: name, location: location };
  db.collection("help").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 help requested");
    db.close();
    });
  });

  // Refresh.
  getDatabase();

  // Reply to user.
  const twiml = new MessagingResponse();
  twiml.message("Your request is accepted! Please wait for our staff to come.");
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

router.post('/complete', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("help").deleteOne({});
    getDatabase();
  });
});

module.exports = router;

// Twilio Test
/*
client.messages.create({
   to: "+19253395106",
   from: "+15103301417",
   body: "HELLO DIANE"
}, function(err, message) {
   console.log(message.sid);
});
*/
