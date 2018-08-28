const Controller = require('egg').Controller;

class TokenController extends Controller{
  async getToken(){
    const ctx = this.ctx;
    const code = ctx.request.body.code;
    ctx.service.token.get(code);
  }
}

module.exports = TokenController;