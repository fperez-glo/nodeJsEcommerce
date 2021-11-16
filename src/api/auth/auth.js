import express from 'express';
const { Router } = express
const router = new Router();

import users from './users.js';

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

export default router;