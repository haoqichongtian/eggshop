const Controller = require('egg').Controller;

class AddressController extends Controller{
  /**
   * 根据传递的数据查找用户地址 有更新 无创建
   */
  async createOrUpdateAddress(){
    let ctx = this.ctx;
    let user= await this.getUserByToken()
    const { name, mobile,province,city,country,detail,token } = ctx.request.body;
    //如果查找到用户的地址则更新，没有就创建用户地址
    let addressDate;
    if(user.user.address!=null){
      let address = await this.app.model.UserAddress.findById(user.user.address.id);
      if (!address) {
        ctx.status = 404;
        return;
      }
      
      addressDate = await address.update({ name, mobile,province,city,country,detail });
      ctx.status = 201;
      ctx.body = 'update';
      return;
    }else{
      addressDate = await this.app.model.UserAddress.create({ name, mobile,province,city,country,detail,user_id:uid })
      ctx.status = 201;
      ctx.body = 'create';
      return;
    }
  }

  /**
   * 根据传递的token查找用户地址
   */
  async getUserByToken(){
    let ctx = this.ctx;
    let token = ctx.request.body.token;
    return await ctx.service.address.getUserByToken(token);
  }

  async getAddress(){
     let user= await this.getUserByToken();
     this.ctx.body =user.user.address;
  }
}

module.exports = AddressController;