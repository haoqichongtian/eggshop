const Controller = require('egg').Controller;

class PayController extends Controller{
  async getPreOrder(){
    let ctx = this.ctx;
    let {token,id} =  ctx.request.body;
    return ctx.service.pay.pay(id);    
  }
}

module.exports = PayController;