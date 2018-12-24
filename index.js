const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
let home = Router();

home.get('/', async (ctx) => {
    let html = `
        <ul>
            <li><a href="/page/helloworld">/page/helloworld</a></li>
            <li><a href="/page/404">/page/404</a></li>
        </ul>
    `
    ctx.body = html;
})

let page = new Router();

page.get('/404', async (ctx) => {
    ctx.body = '404 page!';
}).get('/helloworld', async (ctx) => {
    ctx.body = 'helloworld page!';
});

let router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

app.use(bodyParser());

// app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
    // let url = ctx.url;
    // let request = ctx.request;
    // let req_query = request.query;
    // let req_querystring = request.querystring;

    // let ctx_query = ctx.query;
    // let ctx_querystring = ctx.querystring;


    // ctx.body = {
    //     url,
    //     req_query,
    //     req_querystring,
    //     ctx_query,
    //     ctx_querystring
    // }

    if (ctx.url === '/' && ctx.method == 'GET') {
        let html = `
            <h1>koa2 request post demo</h1>
            <form method="POST" action="/">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>nickName</p>
            <input name="nickName" /><br/>
            <p>email</p>
            <input name="email" /><br/>
            <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method == 'POST') {
        let postData = ctx.request.body;
        ctx.body = postData;
    } else {
        ctx.body = '<h1>404!!！ o(╯□╰)o</h1>'
    }
})

app.listen(9555, () => {
    console.log('[demo] start-quick is starting at port 9555');
});