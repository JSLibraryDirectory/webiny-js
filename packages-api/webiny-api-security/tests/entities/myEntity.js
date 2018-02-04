import { Identity } from "webiny-api-security";

class MyEntity extends Identity {
    constructor() {
        super();
        this.attr("flag").boolean();
    }
}
MyEntity.classId = "MyEntity";

export default MyEntity;
