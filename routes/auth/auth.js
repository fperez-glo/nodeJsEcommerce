const express = require(`express`);
const { Router } = express;
const router = new Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { userDao } = require('../../daos/index')

//PASSPORT LOCAL
passport.use('local-login', new LocalStrategy( async (user, password, done) => {
    console.log('llega al local-login')
    const registeredUser = await userDao.findUser({user, password});
    
    if (registeredUser.length) {
        return done(null, registeredUser)
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
        console.log('El usuario ya existe')
        return done(null, false)
    }

    await userDao.save({user, password});
    
    const createdUser = await userDao.findUser({user, password});
    console.log('LLEGA A CREAR EL USUARIO:', createdUser)
    done(null, createdUser);
    
}))

passport.serializeUser((user, done) =>{
    console.log('user ID:', user[0]._id)
    done(null, user[0]._id)
})

passport.deserializeUser(async (id, done) => {
    console.log('entra a deserializar el usuario con id:', id)
    const deserializedUser = await userDao.findUser({id});
    
    done(null, deserializedUser);
})

router.get('/', (req, res) => {
    if (req.session.authorized){
        res.redirect('/home');
    } else {
        res.render('index', { authorized: false, signUp: false });
    };
})

router.get('/authSignUp', (req, res) => {
    if (req.session.authorized){
        res.redirect('/home');
    } else {
        res.render('index', { authorized: false ,signUp: true });
    };
})

router.post('/authSignUp', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/authSignUp',
}))

router.post('/passport', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/authSignUp'
}))

router.post('/authLogIn', async (req,res)=> {
    if(req.session.authorized){
        res.redirect('/home');
    } else {
        
        const registeredUser = await userDao.findUser(req.body);
        console.log('registeredUser:', {id: registeredUser[0]._id, user: registeredUser[0].user})
        if (registeredUser.length) {
            req.session.user = registeredUser[0].fieldName;
            req.session.authorized = true;
            res.redirect('/home');
        } else {
            res.send('Usuario o contraseña incorrecto.')
        };
    };
    
})

router.post('/authLogOut', (req,res)=> {
    if(req.session.authorized){
        // req.session.authorized = false;
        // delete req.session.user;
        // delete req.session.authorized;
        req.session.destroy((err) =>{
            if(err){
                console.log(err)
            }
            res.redirect('/')
        })
    } else {
        res.redirect('/');
    };
})

router.get('/getUsers',(req, res) => {
    res.send({users})
})

router.put('/putUserUpdate/:username',(req, res) => {
    
    res.send({users})
})

router.post('/postLogin',(req, res) => {
    console.log(req.body)
    res.send({message: 'Usuario Logueado'})
})

module.exports = router