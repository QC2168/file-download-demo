const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
// 新增
const static = require('koa-static');

const app = new Koa();
const router = new Router();

// 新增
app.use(static(path.join(__dirname, './static')));

// 文件下载路由处理函数
router.get('/download/foo', async (ctx) => {
  const filePath = path.join(__dirname, './static/foo.txt'); // 获取文件路径
  const stat = fs.statSync(filePath); // 获取文件状态
  ctx.set({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename=foo.txt`,
    'Content-Length': stat.size
  });
  ctx.body = fs.createReadStream(filePath); // 创建可读流返回文件内容
});

// 文件下载，返回链接
router.get('/download/getLink', async (ctx) => {
  const filename = "sheet.xlsx"
  ctx.body = { filename, url: `http://localhost:3000/${filename}` };
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});