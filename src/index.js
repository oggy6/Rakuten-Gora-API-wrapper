
const
  bodyParser = require('body-parser'),
  express = require('express'),
  https = require('https'),
  logger = require("./logger.js"),
  request = require('request'),
  golfcourse = require("./golfcourse.js"),
  golfplan = require("./golfplan.js"),
  ichibaitem = require("./ichibaitem.js");
// Create a new instance of express
const app = express();

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.raw({ extended: false }));
//app port
app.set('port', process.env.PORT || 5000);

//POST /gora/golfcourse
app.get('/gora/golfcourse', function (req, res) {
  
  //logger.log(JSON.stringify(req));
  
  var date = req.query.date; //JSON object with all the request data
  var place = req.query.place;

  logger.log(place + "body:   ->   "+date);
  
  //data = JSON.parse(data);
  //logger.log("REQUEST params: -> "+ JSON.stringify(req));
  if (date && place) {
    
    golfcourse.get(date, place, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});  

//POST /gora/golfplan
app.get('/gora/golfplan', function (req, res) {
  var date = req.query.date; //JSON object with all the request data
  var place = req.query.place;
  //data = JSON.parse(data);
  //logger.log("REQUEST params: -> "+ JSON.stringify(data));
  if (date && place) {
    
    golfplan.get(date, place, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
}); 

//POST /gora/ichiba
app.get('/gora/ichibaitem', function (req, res) {
  var key = req.query.keyword; //JSON object with all the request data
  var sex = req.query.gender
  //data = JSON.parse(data);
  //logger.log("REQUEST params: -> "+ JSON.stringify(data));
  if (key && sex) {
    
    ichibaitem.get(key, sex, res);

  } else {
    logger.log("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});  


// Tell our app to listen on port 
app.listen(app.get('port'), function () {
  logger.log('Node app is running on port', app.get('port'));
});
