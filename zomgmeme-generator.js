var _ = require('underscore')._;

module.exports = function(canvas, img, top, bottom) {
    var width = canvas.width,
        height = canvas.height,
        ctx = canvas.getContext('2d');

    function writeCaption(text, y) {
        var size = 150;

        do {
          size--;
          ctx.font = size + 'px Impact';
          ctx.lineWidth = size / 32;
        } while ( ctx.measureText( text ).width > width );

        ctx.fillText( text, width / 2, y );
        ctx.strokeText( text, width / 2, y );
    }

    _.extend(ctx, {
        strokeStyle : '#000000',
        textAlign : 'center',
        fillStyle : '#ffffff',
        lineCap : 'round'
    });

    ctx.clearRect( 0, 0, width, height );
    ctx.drawImage( img, 0, 0 );
    ctx.textBaseline = 'top';
    writeCaption( top.toUpperCase(), 0 );

    ctx.textBaseline = 'bottom';
    writeCaption( bottom.toUpperCase(), height );

    return canvas;
};
