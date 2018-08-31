const Service = require('egg').Service;

class PayService extends Service{
  constructor(ctx){
    super(ctx);
  }
  /**
   * 预支付
   * @param {订单号} id 
   */
  async pay(id){
    let order = await this.app.model.Order.find({
      where:{
        order_no:id
      }
    })
    
  }
}

module.exports = PayService;