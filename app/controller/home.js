'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1',time:1535103554192 },
        { id: 2, title: 'this is news 2', url: '/news/2',time:1535103554192 }
      ]
    };
    await this.ctx.render('home/list.tpl', dataList);
  }


  async banner() {
    const ctx = this.ctx;
    // const bannerId = ctx.query.id; 适用于？id=1
    // const { id } = ctx.request.body; 适用于post body传递数据
    const bannerId = ctx.params.id; //适用于/:id 
    const banner = await ctx.service.home.getBanner(bannerId);
    ctx.body = banner;
    
  }
}

module.exports = HomeController;
