const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;
const auth = require('./routes/auth');
const articles = require('./routes/articles');
const fish = require('./routes/fish');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Authorization, Cookie, Cookies");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Credentials", 'true');
    next();
});



app.use('/auth', auth);

app.use('/articles', articles);

app.use('/fish', fish);

app.listen(3001);


