// Express Setup
var http = require('http');
var express = require('express');
var router = express.Router();

// Twilio Setup
var accountSid = 'AC7e4969825a94132e9d2684bc11ae547b';
var authToken = '7a7876cd6794a7142628ec81238f04ef';
var client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var address = "321 Golf Club Road, Pleasant Hill, CA";
var replaced;
format();

// Format address.
function format() {
  var str = address;
  replaced = str.split(' ').join('+');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/driver', function(req, res, next) {
  res.render('driver', { title: 'Driver', location: replaced });
});

router.get('/request', function(req, res, next) {
  res.render('request', { title: 'Request' });
});

// POST

router.post('/sms', (req, res) => {
  address = req.body.Body;
  format();
  const twiml = new MessagingResponse();

  twiml.message('You said' + req.body.Body);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
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
