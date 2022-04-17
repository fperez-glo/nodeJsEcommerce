import { userDao } from "../../models/daos/index.js";

export class AuthService {

    async postAditionalData ({id, body}) {
        return await userDao.putUpdate(id, body);
    }

    async findUserById (userId) {
        return await userDao.findUserById({_id: userId});
    }
}