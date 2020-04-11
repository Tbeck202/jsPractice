const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override');
app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
const port = process.env.PORT || 3000;
//ROUTES====================
app.get('/', (req, res) => {
	res.send('Go Jazz!');
});

app.listen(port, () => {
	console.log(`Jazz app LIstening on Port ${port}`);
});
