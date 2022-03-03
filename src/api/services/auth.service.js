import { userDao } from "../../models/daos/index.js";

export class AuthService {

    async postAditionalData (userInfo) {
        return await userDao.putUpdate(userInfo)
    }
}