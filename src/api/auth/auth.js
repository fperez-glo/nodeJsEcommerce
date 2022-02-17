import express from "express";
import passport from "passport";
import "../../helpers/passport-local.js";
import { upload } from "../../helpers/multer.js";
import { userDao } from "../../daos/index.js";
import { sendSMS } from '../../helpers/twilio.js';

const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
  if (req.session.authorized) {
    res.redirect("/home");
  } else {
    res.render("index", { authorized: false, signUp: false, loginError: false });
  }
});

router.get("/authSignUp", (req, res) => {
  if (req.session.authorized) {
    res.redirect("/home");
  } else {
    res.render("index", { authorized: false, signUp: true, signUpError: false });
  }
});

// router.post('/authSignUp', passport.authenticate('local-signup', {
//     successRedirect: '/',
//     failureRedirect: '/signUpError',
// }),update.single('avatar'))

router.post(
  "/authSignUp",
  passport.authenticate("local-signup", {
    successRedirect: "/signUpAditionalData",
    failureRedirect: "/signUpError",
  })
);

router.post(
  "/passportLogin",
  passport.authenticate("local-login", {
    successRedirect: "/home",
    failureRedirect: "/loginError",
  })
);

router.get("/loginError", (req, res) => {
  //res.render("./error_views/authError", { loginError: true });
  res.render("index", { authorized: false, signUp: false ,loginError: true });
});

router.get("/signUpError", (req, res) => {
  //res.render("./error_views/authError", { loginError: false });
  res.render("index", { authorized: false, signUp: true, signUpError: true });
});

router.post("/authLogOut", (req, res) => {
  if (req.session.authorized) {
    req.logOut();
    delete req.session.authorized;
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

router.get("/getUsers", (req, res) => {
  res.send({ users });
});

router.put("/putUserUpdate/:username", (req, res) => {
  res.send({ users });
});

router.get("/signUpAditionalData", ({session}, res) => {
  if(session?.passport?.user) {
    const { user } = session.passport;
    res.render('signUpAditionalData', { user });
  } else {
    res.redirect('/');
  };
});

router.post("/signUpAditionalData", upload.single("avatar"), ({body, session}, res) => {
  if(session?.passport?.user) {
    const { user } = session.passport;
    const { fieldName, adress, age, phone, avatar } = body;

    const userInfo = {
      _id: user, fieldName, adress, age, phone, avatar
    };

    userDao.putUpdate(userInfo);

    res.redirect('/');
  } else {
    res.redirect('/');
  };
});

router.post('/sendSMS',(req,res) => {
  sendSMS('Hola desde twilio SMS');
  res.send('SMS enviado!')
});

export default router;
