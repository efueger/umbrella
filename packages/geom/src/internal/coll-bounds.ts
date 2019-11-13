import { Fn } from "@thi.ng/api";
import { AABBLike, IShape } from "@thi.ng/geom-api";
import { mixCubic as _mixCubic } from "@thi.ng/math";
import { unionBounds } from "./union-bounds";

/**
 * Computes the total bounds for the given shape collection, which
 * should either contain only 2D or 3D types. No mixed dimensions are
 * allowed! Currently the `bounds` function must be passed in as arg to
 * avoid circular module dependencies.
 *
 * @param shapes -
 * @param bounds -
 */
export const collBounds = (
    shapes: IShape[],
    bounds: Fn<IShape, AABBLike | undefined>
) => {
    let n = shapes.length - 1;
    if (n < 0) return;
    let b = bounds(shapes[n]);
    if (!b) return;
    let { pos, size } = b;
    for (; --n >= 0; ) {
        b = bounds(shapes[n]);
        if (!b) continue;
        [pos, size] = unionBounds(pos, size, b.pos, b.size);
    }
    return [pos, size];
};
