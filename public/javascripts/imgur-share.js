function share(canvas) {
  var img;

  try {
    img = canvas.toDataURL('image/png', 0.9).split(',')[1];
  } catch(e) {
    img = canvas.toDataURL().split(',')[1];
  }

  // upload to imgur using jquery/CORS
  // https://developer.mozilla.org/En/HTTP_access_control
  return $.ajax({
    url: 'http://api.imgur.com/2/upload.json',
    type: 'POST',
    data: {
      type: 'base64',
      key: '46137a3a008f4960d3076429229d4545',
      name: 'lememe.png',
      title: 'ZOMG! Memes',
      image: img
    },
    dataType: 'json'
  });
}
