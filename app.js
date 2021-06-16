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
    // 路由中没有character且location且episode，返回404
    ctx.response.status = 404;
    ctx.response.body = 'character or location or episode';
  } else {
    try {
      // 直接请求将结果返回
      await axios.get('https://rickandmortyapi.com/api' + ctx.request.url)
        .then(res => ctx.response.body = res.data)
    }
    catch {
      // 返回空数据
      const { id } = ctx.params
      if (id && id.split(',').length === 1) {
        ctx.response.body = {}
      } else {
        ctx.response.body = {
          info: {},
          results: []
        }
      }
    }
  }
}

router.get('/:target', main)
router.get('/:target/:id', main)
app.use(router.routes())

app.listen(3000);