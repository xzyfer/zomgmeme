var _ = require('underscore')._;

module.exports = (typeof window === 'undefined' ? {} : window).zomgmeme = function(canvas, img, top, bottom) {
    var hasJquery = typeof jQuery !== 'undefined',
        width = hasJquery ? canvas.width() : canvas.width,
        height = hasJquery ? canvas.height() : canvas.height,
        ctx = (hasJquery ? canvas[0] : canvas).getContext('2d');

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

    (hasJquery ? $ : _).extend(ctx, {
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
