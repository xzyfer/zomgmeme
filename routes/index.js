var
  app,
  controller = {},
  fs = require('fs'),
  Canvas = require('canvas'),
  Image = Canvas.Image,
  im = require('imagemagick'),
  generator = require('../zomgmeme-generator'),
  imgur = require('imgur-api')('46137a3a008f4960d3076429229d4545');

module.exports = function (_app) {
    app = _app;
    return controller;
};

controller.index = function(req, res) {
  var
    meme = req.param('meme'),
    top = req.param('top'),
    bottom = req.param('bottom'),
    publish = req.param('publish'),
    imagePath = __dirname + '/../public/images/characters/' + meme + '.png';

  if(!fs.existsSync(imagePath)) {
    res.status(404).sendfile(app.get('404 image path'));
    return;
  }

  im.identify(imagePath, function(err, features) {
    if (err) throw err;
    var
      img = new Image(),
      canvas = new Canvas(features.width, features.height);

    img.src = fs.readFileSync(imagePath);
    var meme = generator(canvas, img, top, bottom);

    if(publish) {
      meme.toDataURL('image/png', function(err, data) {
        if (err) throw err;
        imgur.upload(data.replace(/data:image\/png;base64,/, ''), function(err, data) {
          if (err) throw err;
          res.set('Content-Type', 'text/json');
          res.send(data.upload.links.original);
        });
      });
    } else {
      res.set('Content-Type', 'text/plain');
      res.send(meme.toBuffer());
    }
  });

};
