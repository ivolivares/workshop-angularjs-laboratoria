var express = require('express');
var app = express();

app.use(express.static('./public'));

app.listen(3000, function() {
  console.log('Application running on http://localhost:3000/index.html');
});