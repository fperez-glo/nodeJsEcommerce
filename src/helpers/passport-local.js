import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { userDao } from '../daos/index.js'
import { encrypt, compare } from './crypto.js';
import { sendEmail } from './nodeMailer.js';
import { console as cLog } from './logger.js'

//PASSPORT LOCAL
passport.use('local-login', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
} ,async (req,user, password, done) => {

    const searchUser = await userDao.findUser({user});

    if (searchUser.length) {
        //Comparo el password ingresado sin encriptar con el de la base de datos encriptado. 
        const provideAccess = compare(password, searchUser[0].password);
       
        if (provideAccess) {
            if(searchUser[0].role==='admin'){
                cLog.info(`Se ha logueado el usuario Administrador: ${searchUser[0].user}`)
                req.session.administrador=true
            };
            req.session.authorized = true;
            req.session.fieldName = searchUser[0].fieldName;
            return done(null, searchUser);
        };
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