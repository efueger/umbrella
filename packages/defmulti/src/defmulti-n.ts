import { illegalArity } from "@thi.ng/errors";
import { DEFAULT, Implementation } from "./api";
import { defmulti } from "./defmulti";

/**
 * Returns a multi-dispatch function which delegates to one of the
 * provided implementations, based on the arity (number of args) when
 * the function is called. Internally uses `defmulti`, so new arities
 * can be dynamically added (or removed) at a later time. If no
 * `fallback` is provided, `defmultiN` also registers a `DEFAULT`
 * implementation which simply throws an `IllegalArityError` when
 * invoked.
 *
 * **Note:** Unlike `defmulti` no argument type checking is supported,
 * however you can specify the return type for the generated function.
 *
 * ```ts
 * const foo = defmultiN<string>({
 *   0: () => "zero",
 *   1: (x) => `one: ${x}`,
 *   3: (x, y, z) => `three: ${x}, ${y}, ${z}`
 * });
 *
 * foo();
 * // zero
 * foo(23);
 * // one: 23
 * foo(1, 2, 3);
 * // three: 1, 2, 3
 * foo(1, 2);
 * // Error: illegal arity: 2
 *
 * foo.add(2, (x, y) => `two: ${x}, ${y}`);
 * foo(1, 2);
 * // two: 1, 2
 * ```
 *
 * @param impls -
 * @param fallback -
 */
export const defmultiN = <T>(
    impls: { [id: number]: Implementation<T> },
    fallback?: Implementation<T>
) => {
    const fn = defmulti<T>((...args: any[]) => args.length);
    fn.add(DEFAULT, fallback || ((...args) => illegalArity(args.length)));
    for (let id in impls) {
        fn.add(id, impls[id]);
    }
    return fn;
};
