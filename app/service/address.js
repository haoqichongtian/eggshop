const Service = require('egg').Service;

class AddressService extends Service{
  constructor(ctx){
    super(ctx);
  }

  async getAddressByUid(uid){
    let address = await this.app.model.UserAddress.find({
      where:{
        user_id:uid
      }
    })
    return address
  }

  async getAddressByToken(token){
    let ctx = this.ctx;
    let value = await ctx.service.token.verifyToken(token);
    let uid = value.uid;
    //通过uid查找到用户的地址
    let address = await this.getAddressByUid(uid);
    return address;
  }
}

module.exports = AddressService;