const Controller = require('egg').Controller;

class TokenController extends Controller{
  async getToken(){
    const ctx = this.ctx;
    const code = ctx.request.body.code;
    let token = await ctx.service.token.get(code);
    ctx.body=token;
  }

  async verifyToken(token){
    const ctx = this.ctx;
    const key = ctx.request.body.token;
    let exist = await ctx.service.token.verifyToken(key);
    ctx.body=JSON.parse(exist);
  }

  async getAppToken(){
    const ctx = this.ctx;
    const account = ctx.request.body.account;
    const password = ctx.request.body.password;
    let token = await ctx.service.token.getApp(account,password);
    ctx.body=token;
  }
}

module.exports = TokenController;