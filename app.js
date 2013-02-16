
/**
 * Module dependencies.
 */

var express = require('express')
  , router = require('./routes');

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.set('404 image path', __dirname + '/public/images/404.png');
  console.log(__dirname + '/images/404.png');
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
routes = router(app);
app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening");
});
