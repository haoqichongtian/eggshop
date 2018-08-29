const Service = require('egg').Service;

class TokenService extends Service{
  constructor(ctx){
    super(ctx);
    // console.log(this.ctx.app);
  }

  async get(code){
    const wxLoginUrl = this.ctx.helper.sprintf(this.config.token.login_url,this.config.token.appId,this.config.token.app_secret,code)
    // data:
    //   { session_key: 'cORo4To2ZJkh41RqdDMaxA==',
    //     expires_in: 7200,
    //     openid: 'oRAwC0U91OS3CfyLN5BESeNumlqk' },
    let wxResult =await this.ctx.helper.request(wxLoginUrl);
    // result = JSON.parse(result);
    let token = this.grantToken(wxResult);
    return token;
    // console.log(this.ctx.app.controller.user);
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
    // 暂时先存储到数据库，后续改为redis存储
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
  async prepareValue(uid,wxResult){
    let cacheValue = wxResult;
    cacheValue['uid'] = uid;
    cacheValue['scope'] = this.config.scope.User;
    return cacheValue;
  }
  
  async newToken(key,value){
    const { key,value } = { key,value };
    const tokendata = await this.ctx.model.Token.create({ key,value });
    return tokendata.token;
  }

  async saveToSql(cacheValue){
    let key = this.generateToken();
    let value = JSON.stringify(cacheValue);
    let token = await this.newToken(key,value);
    return token;
  }

  async generateToken(){
    let randomChar = this.ctx.helper.getRandChar(32);
    let timestamp = Date.now();
    let salt = this.config.token.salt;
    return this.ctx.helper.md5serect(randomChar+timestamp+salt);
  }

}

module.exports = TokenService;