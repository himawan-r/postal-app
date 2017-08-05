var express = require('express');
var app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(__dirname + '/public'));

//list of folder that defined by developer
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/template', express.static(__dirname + '/template'));

app.listen(port, hostname);
console.log("My app is listening on port " + port);


