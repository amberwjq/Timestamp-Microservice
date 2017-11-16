// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url  = require('url');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {

  response.sendFile(__dirname + '/views/index.html');
});

app.get("/*", function (request, response) {
   var url_parts = request.url.slice(1).split("%");
  
  console.log("URL_____" + url_parts[0]);
  var naturalDate = null;
  var unixTime=null;

   
  if((months.indexOf(url_parts[0])) >= 0)
    {
      console.log("it's a natural langurage")
      var month = url_parts[0];
      var year = url_parts[1];
      var date = url_parts[2].slice(0,2);
      naturalDate = month+" "+date+", "+year;      
      unixTime=Date.parse(naturalDate);
    }
  else if (url_parts[0].match(/^\d/))
    {
        
        if(/^\d+$/.test(url_parts[0])){
          console.log("valid time");
          naturalDate = converter(url_parts[0]*1000);
          console.log(naturalDate);
          unixTime=url_parts[0] 
        }
         
   }

 
  response.json({"unix":unixTime,"natural":naturalDate});
});


function zeroFill (i) {
  return (i < 10 ? '0' : '') + i
}

function converter (t) {
  const d = new Date(t)
  console.log(d.getMonth());
  var newMonth = months[d.getMonth()];
  return newMonth+' '+zeroFill(d.getDate())+', '+d.getFullYear()
  
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
