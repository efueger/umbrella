import { mixCubic } from "@thi.ng/math";
import { ReadonlyVec, Vec, VecPair } from "@thi.ng/vectors";

/**
 * Computes cubic spline bounds for a single vector component.
 *
 * Based on:
 * http://www.iquilezles.org/www/articles/bezierbbox/bezierbbox.htm
 *
 * @param min -
 * @param max -
 * @param i -
 * @param pa -
 * @param pb -
 * @param pc -
 * @param pd -
 */
const axisBounds = (
    min: Vec,
    max: Vec,
    i: number,
    pa: number,
    pb: number,
    pc: number,
    pd: number
) => {
    min[i] = Math.min(pa, pd);
    max[i] = Math.max(pa, pd);

    const k0 = -pa + pb;
    const k1 = pa - 2 * pb + pc;
    const k2 = -pa + 3 * pb - 3 * pc + pd;
    let h = k1 * k1 - k0 * k2;

    if (h > 0) {
        h = Math.sqrt(h);

        const update = (t: number) => {
            if (t > 0 && t < 1) {
                const q = mixCubic(pa, pb, pc, pd, t);
                min[i] = Math.min(min[i], q);
                max[i] = Math.max(max[i], q);
            }
        };

        update(k0 / (-k1 - h));
        update(k0 / (-k1 + h));
    }
};

export const cubicBounds = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec
): VecPair => {
    const min: Vec = [];
    const max: Vec = [];
    for (let i = a.length; --i >= 0; ) {
        axisBounds(min, max, i, a[i], b[i], c[i], d[i]);
    }
    return [min, max];
};
