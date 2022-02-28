const User = require('./User.js');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');


module.exports = function(passport) {
    passport.use(
        new LocalStrategy((username,password,done) => {
            User.findOne({username:username},(err,user) => {
                console.log(user);
                if (err) throw err;
                if(!user) return done(null,false);
                bcrypt.compare(password,user.password, (err,result) => {
                    if(err) throw err;
                    if(result) {
                        return done(null,user);
                    }else {
                        return done(null,false)
                    }
            })
        })
    }))
    



passport.serializeUser((user,done) => {
    done(null,user.id)
})

passport.deserializeUser((id, done)=>{
      User.findById(id).then((user) => {
        done(null, user);
      }).catch(done);

  });
}

