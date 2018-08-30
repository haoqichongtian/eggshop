const Service = require('egg').Service;

class TokenService extends Service{
  constructor(ctx){
    super(ctx);
    // console.log(this.ctx.app);
  }
  /**
   * 根据微信的code 生成token和对应的个人信息
   * @param {微信code} code 
   */
  async get(code){
    const wxLoginUrl = this.ctx.helper.sprintf(this.config.token.login_url,this.config.token.appId,this.config.token.app_secret,code)
    // data:
    //   { session_key: 'cORo4To2ZJkh41RqdDMaxA==',
    //     expires_in: 7200,
    //     openid: 'oRAwC0U91OS3CfyLN5BESeNumlqk' },
    let wxResult =await this.ctx.helper.request(wxLoginUrl);
    // result = JSON.parse(result);
    let token =await this.grantToken(wxResult);
    return token;
    // console.log(this.ctx.app.controller.user);
  }

  /**
   * 第三方cms 登录所需求的接口 
   * @param {账号} account 
   * @param {密码} password 
   */
  async getApp(account,password){
    let user =await this.ctx.model.ThirdApp.find({
      where:{
        app_id:account,
        app_secret:password
      }
    })
    //用户存在
    if(user.id){
      let appValue = {
        'scope':this.config.scope.User,
        'appid':user.id
      }
      let appToken = await this.saveToSql(appValue);
      return appToken;
    }
  }


  /**
   * 生成本地的token
   * @param {微信请求的结果} result 
   */
  async grantToken(wxResult){
    let openID = wxResult['openid'];
    let user =await this.getUserByOpenId(openID);
    let uid;
    if(user.id){
      uid = user.id;
    }else{
      uid =this.newUser(openID);
    }
    let cacheValue = this.prepareValue(uid,wxResult);
    // 暂时先存储到数据库，后续改为redis存储{"session_key":"69L1d4EA7aKUzmCINR/9pw==","expires_in":7200,"openid":"oRAwC0U91OS3CfyLN5BESeNumlqk","uid":2,"scope":16
    let token = await this.saveToSql(cacheValue);
    return token;
  }
  /**
   * 查找数据库是否有该用户
   * @param {微信返回的openId 身份唯一标识} openID 
   */
  async getUserByOpenId(openID){
    let user = await this.ctx.app.model.User.find({
      where:{
        openid:openID
      }
    })
    return user;
  }

  /**
   * 新建用户数据存入数据库
   * @param {微信返回的openId 身份唯一标识} openID 
   */
  async newUser(openID){
    const { openid } = openID;
    const user = await this.ctx.model.User.create({ openid });
    return user.id;
  }

  /**
   * 准备存储的值（用户id,token,openID,权限）
   * @param {数据库的用户id} uid 
   * @param {微信返回的结果} wxResult 
   */
  prepareValue(uid,wxResult){
    let cacheValue = wxResult;
    cacheValue['uid'] = uid;
    cacheValue['scope'] = this.config.scope.User;
    return cacheValue;
  }
  
  /**
   * 生成标识的token 与对应的个人信息权限
   * @param {需要存储的信息} cacheValue 
   */
  async saveToSql(cacheValue){
    let key = this.generateToken();
    let value = JSON.stringify(cacheValue);
    let tokendata = await this.ctx.model.Token.create({ key,value });;
    return tokendata.key;
  }

  /**
   * 生成随机的字符串加密成token
   */
  generateToken(){
    let randomChar = this.ctx.helper.getRandChar(32);
    let timestamp = Date.now();
    let salt = this.config.token.salt;
    return this.ctx.helper.md5serect(randomChar+timestamp+salt);
  }

  /**
   * 通过客户端传过来的token 查找值
   * @param {客户端保存的token} key 
   */
  async verifyToken(key){
    let exist = await this.ctx.app.model.Token.find({
      where:{
        key
      }
    })
    return exist.value;
  }

}

module.exports = TokenService;