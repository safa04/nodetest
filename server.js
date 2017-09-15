var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express(),

    appId = process.env.APP_ID;

console.log(appId);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

/*Allow CORS*/
app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization'); 
   res.setHeader('Access-Control-Allow-Methods', '*');
   res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
   res.setHeader('Access-Control-Max-Age', '1000');
   next();
});


app.get('/appid', function(req, res) {
    res.send({appId: appId});
});

app.all('*', function (req, res, next) {

        var targetURL = req.header('Target-URL');
        if (!targetURL) {
            res.send(500, { error: 'There is no Target-Endpoint header in the request' });
            return;
        }
        request({ url: targetURL + req.url, method: req.method, json: req.body, headers: {'Authorization': req.header('X-Authorization'), 'Content-Type' : 'application/json'} },
            function (error, response, body) {
                if (error) {
                    console.error('error: ' + response.statusCode)
                }
            }).pipe(res);
});

app.set('port', process.env.PORT || 8200);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});
