var express = require('express'),
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  flash = require('express-flash');
  var app = express();

  app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30 // expire after 30 minutes
  }
}));

app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(bodyParser.urlencoded({
    extended: false
  }))
app.use(bodyParser.json())

const fs = require('fs');

app.get("/alerts", function(req, res) {

  fs.readdir('./public', function(err, files){
    req.flash("warning", "This person is in your property.");
      res.render("home", {
        files : files[files.length-1]
      });
  })
});

// function errorHandler(err, req, res, next) {
//   res.status(500);
//   res.render('error', {
//     error: err
//   });
// }
//
// app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.PORT_NR || 3000;
//start everything up
app.listen(portNumber, function() {
  console.log('server listening on:', portNumber);
});
