import { Entity } from "webiny-api/src";

class User extends Entity {
    constructor() {
        super();
        this.attr("email")
            .char()
            .setValidators("required,email");
        this.attr("password").char();
    }
}

User.classId = "Crud.User";

export default User;
