import { Type } from "@thi.ng/api";
import * as assert from "assert";
import {
    scalar,
    serializer,
    soa,
    utf8z
} from "../src";

describe("serialize", () => {
    it("scalar", () => {
        const struct = soa(2, { id: { type: Type.U32, size: 1 } });
        const ser = serializer({ id: scalar });
        struct.setIndex(0, ser.encode({ id: 0xdecafbad }));
        struct.setIndex(1, ser.encode({ id: 0xaa55aa55 }));
        assert.deepEqual([...struct.values()].map(ser.decode), [
            { id: 0xdecafbad },
            { id: 0xaa55aa55 }
        ]);
    });

    it("utf8z", () => {
        const struct = soa(2, { name: { type: Type.U8, size: 10 } });
        const ser = serializer({ name: utf8z(10) });
        assert.deepEqual(ser.decode(struct.index(0)), { name: "" });
        struct.setIndex(0, ser.encode({ name: "hëLl0!" }));
        assert.deepEqual(
            [...struct.attribValue("name", 0)],
            [104, 195, 171, 76, 108, 48, 33, 0, 0, 0]
        );
        assert.deepEqual(ser.decode(struct.index(0)), { name: "hëLl0!" });
        // overwrite w/ shorter string
        struct.setIndex(0, ser.encode({ name: "🤗" }));
        assert.deepEqual(ser.decode(struct.index(0)), { name: "🤗" });
        assert.doesNotThrow(
            () => struct.setIndex(0, ser.encode({ name: "123456789" })),
            "maxlen"
        );
        assert.deepEqual(
            [...struct.attribValue("name", 0)],
            [49, 50, 51, 52, 53, 54, 55, 56, 57, 0]
        );
        assert.throws(
            () => struct.setIndex(0, ser.encode({ name: "1234567890" })),
            "too large"
        );
    });
});
