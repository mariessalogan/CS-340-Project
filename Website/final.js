var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));

app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.get('/', function(req, res) {
    var context = {};
    mysql.pool.query('SELECT * FROM `character`, `class`, `race`, `HAS`, `IS`, `TRAINS`', function (err, rows, fields) {
    	console.log(context);
        context.results = JSON.stringify(rows);
        res.render('home', context);
    });
});

app.use('/Character', require('./Character.js'));

app.use('/Weapons', require('./Weapons.js'));

app.use('/Race', require('./Race.js'));

app.use('/Class', require('./Class.js'));


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});