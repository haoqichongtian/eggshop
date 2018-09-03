const Service = require('egg').Service;

class PayService extends Service{
  constructor(ctx){
    super(ctx);
    this.token = ctx.request.body.token;
  }
  /**
   * 预支付
   * @param {订单号} id 
   */
  async pay(id){
    this.id = id;
    let order = await this.app.model.Order.find({
      where:{
        order_no:id
      }
    })

    //获取快照里的订单信息 
    let snap_items = JSON.parse(order.snap_items);
    let oProducts=[] ;
    snap_items.forEach((v,i)=>{
      oProducts.push({});
      oProducts[i].product_id=v.id;
      oProducts[i].count=v.count;
    })
    //库存检查
    let status = this.ctx.service.order.compareOrderAndActual(oProducts);
    if(!status.pass){
      return {
        code:10000
      };
      // throw [{field:'name', message:'错误'}]
    }
    return status;
  }
  //生成微信的预订单
  async makeWxPreOrder(totalprice){
    let value = await this.ctx.service.token.verifyToken(this.token);
    let openId =value.openid;
    if(!openId){
      //异常处理
    }
    //调用微信的sdk
    let wxOrderDate = {
      order_no :this.id,
      Trade_type:'JSAPI',
      Total_fee:totalprice*100,
      body:'shop',
      openid:openId,
      Notify_url:'www.tp5.com/notify'
    }
  }
}

module.exports = PayService;