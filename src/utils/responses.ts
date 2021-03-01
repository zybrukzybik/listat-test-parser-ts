import readResults from './readResult'
import {Context} from 'koa'

function responseInvalid(error: Error, context: Context): void {
    console.log(error)

    context.status = 400
    context.body = 'invalid'
}

async function responseOk(context: Context): Promise<void> {
    const results: Array<string> = await readResults()

    context.status = 200
    context.body = {ok: results}
}

export {
    responseOk,
    responseInvalid
}