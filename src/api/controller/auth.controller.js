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

    passport.authenticate("local-login", {
      successRedirect: "/home",
      failureRedirect: "/loginError",
    });
  }

  getLoginError(req, res) {
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

  async getAditionalData({ session }, res) {
    let fieldName;
    if (session?.passport?.user) {
      const { user } = session.passport;
      const avatarPath = session.avatarPath || "/public/resources/default_avatar.jpeg";
      const getAditionalUserData = await super.findUserById(user);
      if(session.fieldName) {
        fieldName = session.fieldName;
      }
      const aditionalUserData = {
        fieldName: getAditionalUserData[0].fieldName,
        adress: getAditionalUserData[0].adress,
        age: getAditionalUserData[0].age,
        phone: getAditionalUserData[0].phone,
        avatarPath: getAditionalUserData[0].avatarPath,
      };

      res.render("signUpAditionalData", { user, avatarPath, aditionalUserData, fieldName });
    } else {
      res.redirect("/");
    }
  }

  async postAditionalData({ body, session }, res) {
    if (session?.passport?.user) {
      const { user } = session.passport;
      const { fieldName, adress, age, phone } = body;
      
      const userInfo = {
        id: user,
        body: {
          fieldName: fieldName === "" ? null : fieldName,
          adress: adress === "" ? null : adress,
          age: age === "" ?  null : age,
          phone: phone === "" ? null : phone,
        }
      };
      await super.postAditionalData(userInfo)

      res.redirect("/");
    } else {
      res.redirect("/");
    }
  }

  getEditAditionalDataForm({ session }, res) {
    let fieldName
    if (session?.passport?.user) {
      const { user } = session.passport;
      const avatarPath = session.avatarPath || "/public/resources/default_avatar.jpeg";
      if(session.fieldName) {
        fieldName = session.fieldName;
      }

      res.render("signUpAditionalData", { user, avatarPath, aditionalUserData: null, fieldName });
    } else {
      res.redirect("/");
    }
  }

}
