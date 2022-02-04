const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const { userDao } = require('../daos/index');

//PASSPORT LOCAL
passport.use('local-login', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
} ,async (req,user, password, done) => {

    const registeredUser = await userDao.findUser({user, password});
    
    if (registeredUser.length) {
        req.session.authorized = true;
        req.session.user = registeredUser[0].fieldName;
        return done(null, registeredUser);
    };

    done(null, false);
}))

passport.use('local-signup', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req ,user, password, done) => {
    const registeredUser = await userDao.findUser({user, password});
    if (registeredUser.length) {
        return done(null, false)
    };

    await userDao.save({user, password});
    
    const createdUser = await userDao.findUser({user, password});
    done(null, createdUser);
    
}));

passport.serializeUser((user, done) =>{
    done(null, user[0]._id)
});

passport.deserializeUser(async (id, done) => {
    const deserializedUser = await userDao.findUser({id});
    
    done(null, deserializedUser);
});

module.exports = passport;