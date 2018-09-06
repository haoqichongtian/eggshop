'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535102262165_1992';
  // console.log(appInfo);
  // add your config here
  // add middleware robot
  exports.middleware = [
    'robot','gzip','bizerror'
  ];
  // robot's configurations
  exports.robot = {
    ua: [
      /Baiduspider/i,
    ]
  };

  config.gzip ={
    threshold: 1024, // 小于 1k 的响应体不压缩
  }

  exports.logger = {
    dir: `${appInfo.root}/logs/${appInfo.name}`,
  };
  // 添加 view 配置
  exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  

  exports.home = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  //wx token
  exports.token = {
    appId:'wxf10240d09fdcd9b0',
    app_secret:'e4c9b8bbc4dc6baf42246683880d4de3',
    js_code:'033t0IIV01rLOV1QOKHV0L7NIV0t0II7',
    grant_type:'',
    login_url:"https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
    access_token_url:"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",
    token_expire_in:7200,
    salt:'kjvoan173HKFK'
  }
  
  exports.security = {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
  };

  //mysql
//   exports.mysql = {
//     // 单数据库信息配置
//     client: {
//       // host
//       host: '127.0.0.1',
//       // 端口号
//       port: '3306',
//       // 用户名
//       user: 'root',
//       // 密码
//       password: '',
//       // 数据库名
//       database: 'sss',
//     },
//     // 是否加载到 app 上，默认开启
//     app: true,
//     // 是否加载到 agent 上，默认关闭
//     agent: false,
//   };
//  //sequelize
//   config.sequelize = {
//     dialect: 'mysql',
//     host: '127.0.0.1',
//     port: 3306,
//     database: 'sss',
//     username: 'root',
//     password: '',
//   };

//   config.redis = { 
//     client: { 
//     port: 6379, // Redis port 
//     host: '127.0.0.1', // Redis host 
//     password: '', 
//     db: 0, 
//     }, 
//   }

  //权限
  config.scope = {
    User:16,
    Super:32
  };
  // config.onerror= {
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     ctx.body = 'error';
  //     ctx.status = 500;
  //   },
  //   html(err, ctx) {
  //     // html hander
  //     ctx.body = '<h3>error</h3>';
  //     ctx.status = 500;
  //   },
  //   json(err, ctx) {
  //     // json hander
  //     ctx.body = { message: 'error' };
  //     ctx.status = 500;
  //   },
  //   jsonp(err, ctx) {
  //     // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
  //   },
  // }

  return config;
};
