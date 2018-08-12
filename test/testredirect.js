var request = require('request');

var url = 'https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photo_reference}&sensor=false&maxheight=${item.height}&maxwidth=${item.width}&key=AIzaSyB676TgO6Sl8GhBOdbIl2egaZN5iHPaMeQ';

var r = request.get('http://google.com?q=foo', function (err, res, body) {
    console.log(r.uri.href);
    console.log(res.request.uri.href);

    // Mikael doesn't mention getting the uri using 'this' so maybe it's best to avoid it
    // please add a comment if you know why this might be bad
    console.log(this.uri.href);
});