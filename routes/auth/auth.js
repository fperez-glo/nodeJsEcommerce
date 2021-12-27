const express = require(`express`);
const { Router } = express;
const router = new Router();

const { userDao } = require('../../daos/index')



router.get('/', (req, res) => {
    if (req.session.authorized){
        res.redirect('/home');
    } else {
        res.render('index', { authorized: false });
    };
})

router.post('/authLogIn', async (req,res)=> {
    if(req.session.authorized){
        res.redirect('/home');
    } else {
        const registeredUser =await userDao.findUser(req.body);
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
        delete req.session.user;
        delete req.session.authorized;
        res.redirect('/')
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