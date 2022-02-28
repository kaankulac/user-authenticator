const mongoose = require('mongoose');

const user = new mongoose.Schema({
        username:String,
        password:String
});

const userModel = mongoose.model("User",user);

module.exports = userModel;