const Service = require('egg').Service;

class OrderService extends Service{
  constructor(ctx){
    super(ctx);
  }

  async place(uid,products){
    
  }
}

module.exports = OrderService;