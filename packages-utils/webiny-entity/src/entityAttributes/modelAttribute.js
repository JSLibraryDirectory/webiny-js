// @flow
import { ModelAttribute as BaseModelAttribute } from "webiny-model";

class ModelAttribute extends BaseModelAttribute {
    getModelInstance() {
        const parentEntity = this.getParentModel().getParentEntity();
        const modelClass = this.getModelClass();
        return new modelClass({ parentEntity });
    }
}

export default ModelAttribute;
