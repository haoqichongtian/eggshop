const Controller = require('egg').Controller;
const Parameter = require('parameter');
const Check = new Parameter();
class PayController extends Controller{
  async getPreOrder(){
    let ctx = this.ctx;
    let {token,id} =  ctx.request.body;
    const createRule = {
      id: {type: 'string',required: true,allowEmpty: false,max:20,min:4}
    };    
  //   try {
  //   this.ctx.validate({
  //     id: 'number',
  //   });
  // }catch(err){
  //   ctx.body = { success: false };
  //   return;
  // }
    const errors = Check.validate(createRule, ctx.request.body);     
    if(!errors){
      let order = await ctx.service.pay.pay(id);    
      ctx.body = order;
    }

    
    
  }
}

module.exports = PayController;