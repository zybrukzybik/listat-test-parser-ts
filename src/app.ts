import 'dotenv/config'

import Koa, {Context} from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

import createFile from './utils/writeResult'
import {responseInvalid} from "./utils/responses";
import resultRoute from './controllers/result'
import dataRoute from './controllers/data'
import errors from "./utils/errors";

const HOST: string = process.env.HOST || '127.0.0.1'
const PORT: number = Number(process.env.PORT) || 3000

const app: Koa = new Koa()
const router: Router = new Router()

app.use(bodyParser())

app.use(async (ctx: Context, next: Function) => {
    try {
        await next()
    } catch (err) {
        (errors.includes(err.message)) ? responseInvalid(err, ctx) : console.log(err)
    }
})

router.get('/result', resultRoute)
router.post('/data', dataRoute)

app.use(router.routes())

app.listen(PORT, HOST, async () => {
    try {
        await createFile('')

        console.log('results.txt created')
        console.log(`Server start at http://${HOST}:${PORT}`)
    } catch (err) {
        console.log(err)
        process.exit(0)
    }
})