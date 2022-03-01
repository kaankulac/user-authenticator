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
const MongoStore = require('connect-mongo');
const {createProxyMiddleware} = require('http-proxy-middleware');

const app = express();

mongoose.connect("mongodb+srv://kaankulac:234234234k@cluster0.5gqvf.mongodb.net/test1?retryWrites=true&w=majority", {  //connecting to mongodb
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
    origin: 'http://localhost:3000', // location of the react app were connecting to
    credentials: true
}))
app.use(session({
    secret: 'secretcode', //cookie parser's secret code
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://kaankulac:234234234k@cluster0.5gqvf.mongodb.net/test1?retryWrites=true&w=majority" }) //connecting to mongodb session store
}));
app.use(  // api middleware
    '/api',
    createProxyMiddleware({
        target: 'http://localhost:4000',
        changeOrigin: 'http://localhost:3000'
    })
)

app.use(cookieParser('secretcode')); // must be the same as express-session's secret code
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig.js')(passport);

app.post('/login', (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) throw err;
            if (!user) res.status(404).send('user not found');
            else {
                req.login(user, err => {
                    req.session.passport = req.user; // set user
                    req.session.isAuthenticated = true;
                    req.session.id = req.sessionID;
                    console.log(req.session)
                    res.status(200).send(req.session)
                })
            }
        })(req, res, next)
    }
    catch (error) {
        console.error(error.message)
    }

});

app.post('/register', async (req, res) => {
    try {
        const salt = 10;
        bcrypt.hash(req.body.registerPassword, salt) // encrypting the password
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


app.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy(err => {
        if (err) throw err;
        res.clearCookie('connect.sid', { path: 'http://localhost:3000/' }).status(200).send('cookie deleted'); // delete all cookie(sessionid-user info ...)
    });
})

app.get('/user', (req,res) => {
    res.send(req.session);
})


