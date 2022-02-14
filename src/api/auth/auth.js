import express from "express";
import passport from "passport";
import "../../utils/passport-local.js";
import { upload } from "../../utils/multer.js";

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
    successRedirect: "/",
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

router.post("/profilePic", upload.single("avatar"), (req, res) => {
  console.log("file!!!!", req.file);
  res.send(`Archivo guardado con exito.`);
  //res.redirect('/');
});

export default router;
