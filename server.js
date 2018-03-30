const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')

const app = new Koa()
app.use(koaBody())
const router = new Router()

const NighmareDemo = require('./nightmare-demo')

router.get('/', async (ctx, next) => {
    const { url, apiKey, apiUrl, proxy } = ctx.query
    const service = new NighmareDemo(proxy, apiKey)
    await service.takeScreenshot(url, apiUrl)
    ctx.body = 'done'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(4444)