import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { userDao } from '../daos/index.js'
import { encrypt, compare } from './crypto.js';
import { sendEmail } from './nodeMailer.js';

//PASSPORT LOCAL
passport.use('local-login', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
} ,async (req,user, password, done) => {
    console.log('ENTRA ACA????')
    //Encripto el password ingresado con el secreto para saber si coincide con el de la base de datos 
    password = encrypt(password);

    const registeredUser = await userDao.findUser({user, password});
    if (registeredUser.length) {
        if(registeredUser[0].role==='admin'){
            console.log('ES ADMINISTRADOR!!!')
            req.session.administrador=true
        };
        req.session.authorized = true;
        req.session.fieldName = registeredUser[0].fieldName;
        return done(null, registeredUser);
    };

    done(null, false);
}))

passport.use('local-signup', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req ,user, password, done) => {
    password = encrypt(password);

    const registeredUser = await userDao.findUser({user, password});
    if (registeredUser.length) {
        return done(null, false)
    };

    await userDao.save({ user, password });
    
    const createdUser = await userDao.findUser({user, password});
    await sendEmail({
        subject:'Nuevo Registro.',
        html:`<b>Un usuario se ha registrado:</b>
              <hr>
              <p>Usuario:${user}</p>`,
    });
    done(null, createdUser);
    
}));

passport.serializeUser((user, done) =>{
    done(null, user[0]._id)
    //done(null, user[0].user)
});

passport.deserializeUser(async (id, done) => {
    const deserializedUser = await userDao.findUser({id});
    
    done(null, deserializedUser);
});

export default passport;