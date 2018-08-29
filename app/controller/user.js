const Controller = require('egg').Controller;

class UserController extends Controller{
  async getByOpenId(openId){
    // const openId = openId; 
    // const user = await this.app.model.User.find({
    //   where:{
    //     openid:openId
    //   }
    // })
    // return user;
  }
}

module.exports = UserController;