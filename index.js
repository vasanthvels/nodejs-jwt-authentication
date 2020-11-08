/*JSON Web Token Integration using Node.js- created by www.hybridappzone.com*/
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());

const user = { id: 6 };
const token = jwt.sign({ user: user.id }, 'HybrdAppZone</>');

app.get('/login', function getToken(req, res) {
  res.json({
    message: 'Token Generated!',
    token: token
  });
});

app.get('/blog', getToken, function (req, res) {
  jwt.verify(req.token, 'HybrdAppZone</>', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Access Granted!'
      });
    }
  });
});


function getToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
