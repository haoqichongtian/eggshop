const Service = require('egg').Service;

class TokenService extends Service{
  constructor(ctx){
    super(ctx);
  }

  async get(code){
    const wxLoginUrl = this.ctx.helper.sprintf(this.config.token.login_url,this.config.token.appId,this.config.token.app_secret,code)
    // data:
    //   { session_key: 'cORo4To2ZJkh41RqdDMaxA==',
    //     expires_in: 7200,
    //     openid: 'oRAwC0U91OS3CfyLN5BESeNumlqk' },
    let result =await this.ctx.helper.request(wxLoginUrl);
    // result = JSON.parse(result);
    this.grantToken(result);
  }

  async grantToken(result){
    let openID = result['openid'];
    let user =await this.app.controller.user.getByOpenId(openID);
    console.log(user);
  }
}

module.exports = TokenService;