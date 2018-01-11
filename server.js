/*JSON Web Token - created by www.hybridappzone.com*/
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();
app.use(bodyParser.json());

var user = { id: 6 };
var token = jwt.sign({ user: user.id }, 'HybrdAppZone</>');

app.get('/', function getToken(req, res) {
  res.json({
    message: 'Permission Granted!', 
    token: token 
  });
  var decoded = jwt.decode(token, {complete: true});
  console.log("decoded: "+JSON.stringify(decoded));
});

app.get('/blog', getToken, function (req, res) {
  console.log("req"+req);
  jwt.verify(req.token, 'HybrdAppZone</>', function(err, data) {
    if (err) {
      res.sendStatus(403);
      console.log("err: "+err);
    } else {
      res.json({
        message: 'Protected information',
        data: data
      });
    }
  });
}); 
 

function getToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log("Headers: "+JSON.stringify(req.headers)); 
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken; 
    next();
  } else {
    res.sendStatus(403);
    console.log("bearerToken error");  
  }
} 

var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
