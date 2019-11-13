import { IObjectOf } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors";
import { StackContext, StackProc } from "./api";
import { $ } from "./safe";
import { nop } from "./stack";
import { $stackFn } from "./word";

//////////////////// Conditionals  ////////////////////

/**
 * Higher order word. Takes two stack programs: truthy and falsey
 * branches, respectively. When executed, pops TOS and runs only one of
 * the branches depending if TOS was truthy or not.
 *
 * Note: Unlike JS `if() {...} else {...}` constructs, the actual
 * conditional is NOT part of this word.
 *
 * ( bool -- ? )
 *
 * @param _then -
 * @param _else -
 */
export const cond = (_then: StackProc, _else: StackProc = nop) => (
    ctx: StackContext
) => ($(ctx[0], 1), $stackFn(ctx[0].pop() ? _then : _else)(ctx));

/**
 * Non-HOF version of `cond`, expects `test` result and both branches on
 * d-stack. Executes `thenq` word/quotation if `test` is truthy, else
 * runs `elseq`.
 *
 * ( test thenq elseq -- ? )
 *
 * @param ctx -
 */
export const condq = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 3);
    const _else = stack.pop();
    const _then = stack.pop();
    return $stackFn(stack.pop() ? _then : _else)(ctx);
};

/**
 * Higher order word. Takes an object of stack programs with keys in the
 * object being used to check for equality with TOS. If a match is
 * found, executes corresponding stack program. If a `default` key is
 * specified and no other cases matched, run `default` program. In all
 * other cases throws an error.
 *
 * Important: The default case has the original TOS re-added to the
 * d-stack before execution.
 *
 * @param cases -
 */
export const cases = (cases: IObjectOf<StackProc>) => (ctx: StackContext) => {
    $(ctx[0], 1);
    const stack = ctx[0];
    const tos = stack.pop();
    const cas = cases[tos];
    if (cas !== undefined) {
        return $stackFn(cas)(ctx);
    }
    if (cases.default) {
        stack.push(tos);
        return $stackFn(cases.default)(ctx);
    }
    illegalState(`no matching case for: ${tos}`);
    return ctx;
};

export const casesq = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 2);
    return cases(stack.pop())(ctx);
};
