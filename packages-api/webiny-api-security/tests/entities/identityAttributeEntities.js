import { Entity } from "webiny-api";
import { Identity } from "../../src/entities";

export class User extends Identity {
    constructor() {
        super();
        this.attr("firstName").char();
        this.attr("lastName").char();
    }
}

User.classId = "User";

export class Company extends Identity {
    constructor() {
        super();
        this.attr("name").char();
    }
}

Company.classId = "Company";

export class Issue extends Entity {
    constructor() {
        super();
        this.attr("title").char();
        this.attr("assignedTo").identity();
    }
}

Issue.classId = "Issue";
