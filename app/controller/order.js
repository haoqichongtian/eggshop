const Controller = require('egg').Controller;

class OrderController extends Controller{
  async placeOrder(){
    let ctx = this.ctx;
    let token = ctx.request.body.token;
    let user = await ctx.service.address.getUserByToken(token);
    let uid = user.user.id;
    let {products} = ctx.request.body;
    console.log(products);
    let status = await ctx.service.order.place(uid,products);
    ctx.body = '1111111';
  }
}

module.exports = OrderController;