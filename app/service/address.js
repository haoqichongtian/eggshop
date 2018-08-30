const Service = require('egg').Service;

class AddressService extends Service{
  constructor(ctx){
    super(ctx);
  }

  async getAddressByUid(uid){
    let user = await this.app.model.User.find({
      where:{
        id:uid
      },
      include:{
        model:this.app.model.UserAddress,
        as:'address'
      }
    })
    return {user}
  }

  async getUserByToken(token){
    let ctx = this.ctx;
    let value = await ctx.service.token.verifyToken(token);
    let uid = JSON.parse(value).uid;
    //通过uid查找到用户的地址
    let user = await ctx.service.address.getAddressByUid(uid);
    return user;
  }
}

module.exports = AddressService;