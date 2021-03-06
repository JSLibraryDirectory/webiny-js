import { assert } from "chai";
import sinon from "sinon";
import SimpleEntity from "./entities/simpleEntity";
import CustomIdEntity from "./entities/customIdEntity";
const sandbox = sinon.sandbox.create();

describe("save error test", function() {
    afterEach(() => sandbox.restore());

    it("should save new entity but an exception must be thrown", async () => {
        sandbox.stub(SimpleEntity.getDriver().getConnection(), "query").callsFake(() => {
            throw Error("This is an error.");
        });

        const simpleEntity = new SimpleEntity();
        try {
            await simpleEntity.save();
        } catch (e) {
            return;
        } finally {
            SimpleEntity.getDriver()
                .getConnection()
                .query.restore();
        }
        throw Error(`Error should've been thrown.`);
    });

    it("should update existing entity but an exception must be thrown", async () => {
        sandbox.stub(SimpleEntity.getDriver().getConnection(), "query").callsFake(() => {
            return { insertId: 1 };
        });

        const simpleEntity = new SimpleEntity();
        await simpleEntity.save();
        SimpleEntity.getDriver()
            .getConnection()
            .query.restore();

        assert.equal(simpleEntity.id, 1);

        sandbox
            .stub(SimpleEntity.getDriver().getConnection(), "query")
            .callsFake((query, callback) => {
                callback(new Error("This is an error."));
            });

        try {
            await simpleEntity.save();
        } catch (e) {
            return;
        } finally {
            SimpleEntity.getDriver()
                .getConnection()
                .query.restore();
        }
        throw Error(`Error should've been thrown.`);
    });

    it("should save new entity into database (with hash IDs enabled), but an exception must be thrown", async () => {
        sandbox.stub(CustomIdEntity.getDriver().getConnection(), "query").callsFake(() => {
            throw Error("This is an error.");
        });

        const customIdEntity = new CustomIdEntity();

        try {
            await customIdEntity.save();
        } catch (e) {
            return;
        } finally {
            assert.equal(customIdEntity.id, null);
            CustomIdEntity.getDriver()
                .getConnection()
                .query.restore();
        }

        throw Error(`Error should've been thrown.`);
    });
});
