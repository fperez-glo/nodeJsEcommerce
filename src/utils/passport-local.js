import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { userDao } from '../daos/index.js'
import { encrypt, compare } from './crypto.js';



   
   // const dataEncrypted = crypto.encrypt('HOLA BUENOS AIRES ARGENTINA..!')

    //const dataDecrypted = crypto.decrypt(dataEncrypted)

                    


//PASSPORT LOCAL
passport.use('local-login', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
} ,async (req,user, password, done) => {
    //Encripto el password ingresado con el secreto para saber si coincide con el de la base de datos 
    password = encrypt(password);

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
}, async ({ body } ,user, password, done) => {
    password = encrypt(password);

    const registeredUser = await userDao.findUser({user, password});
    if (registeredUser.length) {
        return done(null, false)
    };

    const { fieldName, adress, age, phone, avatar } = body;

    if (avatar){
        console.log('LLEGO CON FOTO!!');

    }

    await userDao.save({user, password, fieldName, adress, age, phone, avatar});
    
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

export default passport;