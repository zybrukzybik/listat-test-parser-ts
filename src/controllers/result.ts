import {Context} from 'koa'
import {responseOk} from '../utils/responses'


async function results(ctx: Context) {
    await responseOk(ctx)
}

export default results