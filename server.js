var express = require('express');
var order   = express();
var port    = process.env.PORT || 8080;

order.use(express.static(__dirname+'/'));
order.listen(port);

console.log('App listening at ', port);