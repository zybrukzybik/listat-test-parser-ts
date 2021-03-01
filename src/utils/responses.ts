import readResults from './readResult'
import {Context} from 'koa'

function responseInvalid(error: Error, ctx: Context): void {
    console.log(error)

    ctx.status = 400
    ctx.body = 'invalid'
}

async function responseOk(ctx: Context): Promise<void> {
    const results: Array<string> = await readResults()

    ctx.status = 200
    ctx.body = {results: results}
}

export {
    responseOk,
    responseInvalid
}