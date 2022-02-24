import express from "express";
import { AuthController } from "../controller/auth.controller.js";
import { upload } from "../../helpers/multer.js";

import passport from "passport";

const { Router } = express;
const router = new Router();

const authController = new AuthController();

router.get("/", authController.getHome);
router.get("/authSignUp", authController.getLoginAuth);

router.get("/loginError", authController.getLoginError);
router.get("/signUpError", authController.getSignUpError);
router.post("/authLogOut", authController.getLogOut);
router.get("/signUpAditionalData", authController.getAditionalData);
router.post(
  "/signUpAditionalData",
  upload.single("avatar"),
  authController.postAditionalData
);


// router.post("/authSignUp", authController.postPassportSignUp);
// router.post("/passportLogin", authController.postPassportLogin);
router.post("/authSignUp", passport.authenticate("local-signup", {
  successRedirect: "/signUpAditionalData",
  failureRedirect: "/signUpError",
}));
router.post("/passportLogin", passport.authenticate("local-login", {
  successRedirect: "/home",
  failureRedirect: "/loginError",
}));

export default router;
