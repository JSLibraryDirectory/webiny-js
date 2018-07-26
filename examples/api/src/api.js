import config from "./configs";
import { api } from "webiny-api";
import myApp from "./myApp";

api.configure(config()).use(myApp());
/*.use(cmsApp())*/

export default api;
