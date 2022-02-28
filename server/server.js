const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./User.js');

const app = express();

mongoose.connect("mongodb+srv://kaankulac:234234234k@cluster0.5gqvf.mongodb.net/test1?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to db');
    app.listen(4000, () => {
        console.log('server is running on port 4000')
    })
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', // react path
    credentials: true
}))
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig.js')(passport);

app.post('/login', (req, res, next) => {
    try {
        console.log(req.body)
        passport.authenticate("local", (err, user, info) => {
            if (err) throw err;
            if (!user) res.status(404).send('user not found');
            else {
                req.login(user, err => {
                    if (err) throw err;
                    res.send(req.user);
                })
            }
        })(req, res, next)
    }
    catch(error) {
        console.error(error.message)
    }

});

app.post('/register', async (req, res) => {
    try {
        const salt = 10;
        bcrypt.hash(req.body.registerPassword, salt)
            .then(async (hash) => {
                await User.create({
                    username: req.body.registerUsername,
                    password: hash
                })
                res.status(201).send('registered');
            })
            .catch(e => console.error(e));
    }
    catch (error) {
        res.status(400).json({ message: error })
    }
})
app.get('/user', (req, res) => {
    res.send(req.user);
})


