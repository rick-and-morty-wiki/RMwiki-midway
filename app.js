const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios')

const app = new Koa();
const router = new Router();

const main = async (ctx) => {
  const { target } = ctx.params
  if (target !== 'character' &&
    target !== 'location' &&
    target !== 'episode') {
    ctx.response.status = 404;
    ctx.response.body = 'character or location or episode';
  } else {
    const res = await axios.get('https://rickandmortyapi.com/api' + ctx.request.url)
    ctx.response.body = JSON.stringify(res.data)
  }
}

router.get('/:target', main)
router.get('/:target/:id', main)
app.use(router.routes())

app.listen(process.env.PORT || 3000);