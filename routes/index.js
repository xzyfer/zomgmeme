var
  app,
  controller = {},
  fs = require('fs'),
  Canvas = require('canvas'),
  Image = Canvas.Image,
  im = require('imagemagick'),
  generator = require('../zomgmeme-generator');

module.exports = function (_app) {
    app = _app;
    return controller;
};

controller.index = function(req, res) {
  var
    meme = req.param('meme'),
    top = req.param('top'),
    bottom = req.param('bottom'),
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

    res.set('Content-Type', 'text/plain');
    res.send(meme.toBuffer());
  });

};
