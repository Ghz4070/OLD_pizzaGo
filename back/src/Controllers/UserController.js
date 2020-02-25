import { prisma } from '../providers/generated/prisma-client';
import { success, error } from '../returnFunc';

class UserController {
    getAllUser() {
        return new Promise(async (next) => {
            const Users = await prisma.users()
            if(Users.length > 0) {
                next(success(Users));
            }else {
                next(success('no user'));
            }
        })
    }
}

export default new UserController();