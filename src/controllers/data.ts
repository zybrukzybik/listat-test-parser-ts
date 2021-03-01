import assert from 'assert'

import {Context} from "koa";

import {isArr, isEmptyArr, isObj, isEmptyObj, isHaveExpressionsArr, isArrWithOneEmptyEl} from '../utils/validation'
import writeResults from '../utils/writeResult'
import {responseOk} from '../utils/responses'
import parser from '../utils/parser'

interface Body {
    expressions: Array<string>
}

async function data(ctx: Context) {
    const body: Body = ctx.request.body

    assert(isObj(body) && !isEmptyObj(body) && isHaveExpressionsArr(body), 'invalid body')

    const expr: Array<string> = body.expressions

    assert(isArr(expr) && !isEmptyArr(expr) && !isArrWithOneEmptyEl(expr), 'invalid array')

    const results: Array<string> = parser(expr)

    await writeResults(results.join('\n'))
    await responseOk(ctx)
}

export default data