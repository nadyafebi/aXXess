// Express Setup
var http = require('http');
var express = require('express');
var router = express.Router();

// Twilio Setup
var accountSid = 'AC7e4969825a94132e9d2684bc11ae547b';
var authToken = '7a7876cd6794a7142628ec81238f04ef';
var client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/driver', function(req, res, next) {
  res.render('driver', { title: 'Driver' });
});

// POST

router.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

module.exports = router;

// Twilio Test
/*
client.messages.create({
   to: "+19257255730",
   from: "+15103301417",
   body: "This is from hack4humanity.",
}, function(err, message) {
   console.log(message.sid);
});
*/
