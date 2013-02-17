
$(function() {

  var
    // template for loading images
    imgPath = 'images/characters/{{character}}.png',

    // meme text prompts
    $top = $('#top'),
    $bottom = $('#bottom'),

    // magic to jerry-rig mobile behaviour
    $coverImg = $('#coverImg'),
    maxWidth = $('#canvas-wrapper').width(),

    // publish button
    $publishBtn = $('#publishBtn'),

    // publish status
    $success = $('#success'),
    $fail = $('#fail'),

    // state
    ready = false,
    waiting = false,
    dirty = false,
    $cvs, img;

  [
    'All of the things',
    'Annoying FB girl',
    'Baby godfather',
    'Bear Grylls',
    'Bitch please',
    'Bitch please (colour)',
    'Challenge accepted',
    'Chuck Norris',
    'Condescending Wonka',
    'Conspiracy Keanu',
    'First world problems',
    'Forever alone',
    'Good guy Greg',
    'Great scott',
    'Hipster barista',
    'I hate',
    'Me gusta',
    'My name is Earl',
    'Not bad Obamas',
    'Not sure if',
    'Okay',
    'One does not simply',
    'Pedo Bear',
    'Philosoraptor',
    'Rage fu',
    'Ridiculasly photogenic guy',
    'Science cat',
    'Science dog',
    'Scumbag Steve',
    'Skeptical thrid world child',
    'Socially awkward penguin',
    'Success kid',
    'The most interesting guy in the world',
    'Trollface',
    'What if I told you',
    'Whyyyy'
  ].forEach(function(c) {
    $('#lememes').append($('<option>', {
        text: c,
        value: c.toLowerCase().replace(/\s/g, '_').replace(/[^\w_]/g, '')
      }));
  });

  //-- functions

  var update = _.throttle(function() {
    // delay update if the image isn't loaded
    // or we're already updating
    if(!ready || waiting) {
      setTimeout(update, 200);
      return;
    }

    waiting = true;
    zomgmeme($cvs, img, $top.val(), $bottom.val());

    $coverImg
      .attr('src', $('canvas')[0].toDataURL('image/png'))
      .css('left', $('canvas').position().left)
      .show();

    ready = true;
    waiting = false;
    reset();
  }, 100);

  var prepCanvas = _.throttle(function() {
    if(img.width > maxWidth) {
      img.height = maxWidth / (img.width/img.height);
      img.width = maxWidth;
    }

    $('canvas').remove();
    $coverImg.hide();
    $cvs = $('<canvas width='+img.width+' height='+img.height+' />');

    $('#canvas-wrapper').prepend($cvs);
    ready = true;
    update();
  }, 100);

  var reset = function() {
    if(!dirty) return;

    // reset publish button state
    $publishBtn.button('reset');

    // reset success state and link
    $success.slideUp()
      .find('a').attr('href', '#');

    // reset fail state
    $fail.slideUp();

    // enable text prompts
    // this shouldn't be needed but I'm paranoid
    $top.prop('disabled', false);
    $bottom.prop('disabled', false);

    dirty = false;
  };

  //-- triggers

  $('#lememes').on('change', function() {
    if(img) $(img).remove();

    ready = false;
    var $img = $('<img />')
      .attr('src', imgPath.replace(/\{\{.*?\}\}/, $(this).val()))
      .load(function() { img = this; prepCanvas(); });
  }).trigger('change');

  $('textarea').on('keyup', update);

  //-- buttons

  $('#publishBtn').on('click', function() {
    reset();

    dirty = true;
    $publishBtn.button('loading');

    // prevent updating image whilst posting
    $top.prop('disabled', true);
    $bottom.prop('disabled', true);

    share($('canvas')[0])
      .done(function(data) {
        var url = data.upload.links.imgur_page;
        $success
          .slideDown()
          .find('a')
            .attr('href', url);
      })
      .fail(function() {
        $fail.slideDown();
      })
      .always(function() {
        $publishBtn.button('reset');

        // enable text prompts regardless of success
        $top.prop('disabled', false);
        $bottom.prop('disabled', false);
      });
    return false;
  });

});
