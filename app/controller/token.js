const Controller = require('egg').Controller;

class TokenController extends Controller{
  async getToken(){
    const ctx = this.ctx;
    const code = ctx.request.body.code;
    let token = await ctx.service.token.get(code);
    ctx.body=token;
  }
}

module.exports = TokenController;