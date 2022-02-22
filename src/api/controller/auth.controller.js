import { AuthService } from "../services/auth.service.js";
import passport from "passport";
import "../../helpers/passport-local.js";


export class AuthController extends AuthService {
  constructor() {
    super();
  }

  getHome(req, res) {
    if (req.session.authorized) {
      res.redirect("/home");
    } else {
      res.render("index", {
        authorized: false,
        signUp: false,
        loginError: false,
      });
    }
  }

  getLoginAuth(req, res) {
    if (req.session.authorized) {
      res.redirect("/home");
    } else {
      res.render("index", {
        authorized: false,
        signUp: true,
        signUpError: false,
      });
    }
  }

  async postPassportSignUp(req, res) {
    passport.authenticate("local-signup", {
      successRedirect: "/signUpAditionalData",
      failureRedirect: "/signUpError",
    });
  }

  async postPassportLogin(req, res) {
    console.log('EJECUTA postPassportLogin??')
    passport.authenticate("local-login", {
      successRedirect: "/home",
      failureRedirect: "/loginError",
    });
  }

  getLoginError(req, res) {
    console.log('EJECUTA LOGIN ERROR???')
    //res.render("./error_views/authError", { loginError: true });
    res.render("index", { authorized: false, signUp: false, loginError: true });
  }

  getSignUpError(req, res) {
    //res.render("./error_views/authError", { loginError: false });
    res.render("index", { authorized: false, signUp: true, signUpError: true });
  }

  getLogOut(req, res) {
    if (req.session.authorized) {
      req.logOut();
      delete req.session.authorized;
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  }

  getAditionalData({ session }, res) {
    if (session?.passport?.user) {
      const { user } = session.passport;
      res.render("signUpAditionalData", { user });
    } else {
      res.redirect("/");
    }
  }

  async postAditionalData({ body, session }, res) {
    if (session?.passport?.user) {
      const { user } = session.passport;
      const { fieldName, adress, age, phone, avatar } = body;

      const userInfo = {
        _id: user,
        fieldName,
        adress,
        age,
        phone,
        avatar,
      };

      await super.postAditionalData(userInfo)
      //userDao.putUpdate(userInfo);

      res.redirect("/");
    } else {
      res.redirect("/");
    }
  }

}
