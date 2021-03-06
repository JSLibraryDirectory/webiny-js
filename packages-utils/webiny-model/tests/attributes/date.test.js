import { assert } from "chai";
import Model from "./../../src/model";
import ModelError from "./../../src/modelError";

const model = new Model(function() {
    this.attr("attribute").date();
});

describe("attribute boolean test", function() {
    it("should accept Date object as value", () => {
        model.attribute = new Date();
        assert.isDefined(model.attribute);
        assert.instanceOf(model.attribute, Date);

        model.attribute = null;
        assert.equal(model.attribute, null);

        model.attribute = undefined;
        assert.isNull(model.attribute);
    });

    [{}, [], true, false].forEach(value => {
        it(`shouldn't accept ${typeof value}`, async () => {
            let error = null;
            try {
                model.attribute = value;
                await model.validate();
            } catch (e) {
                error = e;
            }

            assert.instanceOf(error, ModelError);
            assert.equal(error.type, ModelError.INVALID_ATTRIBUTES);
        });
    });

    it("should accept Date object and string/number should be converted into Date object", () => {
        model.attribute = 1517520575917;
        assert.instanceOf(model.attribute, Date);
        assert.equal(+model.attribute, 1517520575917);

        model.attribute = "2018-02-01T21:29:35.917Z";
        assert.instanceOf(model.attribute, Date);
        assert.equal(model.attribute.toISOString(), "2018-02-01T21:29:35.917Z");
    });
});
