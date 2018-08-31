const Controller = require('egg').Controller;

class OrderController extends Controller{
  /**
   * 下单接口
   */
  async placeOrder(){
    let ctx = this.ctx;
    let token = ctx.request.body.token;
    let value = await ctx.service.token.verifyToken(token);
    let uid = value.uid;
    let products = eval(ctx.request.body.products);
    let status = await ctx.service.order.place(uid,products);
    ctx.body = status;
  }

  /**
   * 获取用户的历史订单的接口
   */
  async getSummaryByUser(){
    let ctx = this.ctx;
    let {token,page,pageSize} = ctx.request.body;
    let value = await ctx.service.token.verifyToken(token);
    let uid = value.uid;
    let pageData = await ctx.service.order.getSummaryByUid(uid,page,pageSize);
    ctx.body = pageData;
  }

  /**
   * 通过订单id获取订单信息
   * @param {订单id} id 
   */
  async getDetail(){
    let ctx = this.ctx;
    let id = ctx.params.id;
    let order = await this.app.model.Order.findById(id);
    ctx.body = order;
  }

  /**
   * 通过cms 获取到所有的订单便于管理
   */
  async getSummary(){
    let ctx = this.ctx;
    let {page,pageSize} = ctx.query;
    let pageData = await ctx.service.order.getSummaryByUid('',page,pageSize);
    ctx.body = pageData;
  }
}

module.exports = OrderController;