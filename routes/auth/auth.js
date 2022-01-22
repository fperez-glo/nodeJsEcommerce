const express = require(`express`);
const { Router } = express;
const router = new Router();
const { userDao } = require('../../daos/index');
const passport = require('passport');
require('../../services/passport-local')


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

//RUTA para probar el login con passport
router.post('/passportLogin', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/authSignUp',
}))

// router.post('/authLogIn', async (req,res)=> {
//     if(req.session.authorized){
//         res.redirect('/home');
//     } else {
        
//         const registeredUser = await userDao.findUser(req.body);
//         console.log('registeredUser:', {id: registeredUser[0]._id, user: registeredUser[0].user})
//         if (registeredUser.length) {
//             req.session.user = registeredUser[0].fieldName;
//             req.session.authorized = true;
//             res.redirect('/home');
//         } else {
//             res.send('Usuario o contraseña incorrecto.')
//         };
//     };
    
// })

router.post('/authLogOut', (req,res)=> {
    if(req.session.authorized){
        console.log('ENTRA AL LOGOUT')
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