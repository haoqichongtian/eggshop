const Controller = require('egg').Controller;

class CategoryController extends Controller{
  async getOneCategory(){
    const ctx =this.ctx;
    const id = ctx.params.id;
    const category = await ctx.service.category.getCategory(id);
    ctx.body = category;
  }

  async getCategory(){
    const ctx =this.ctx;
    const category = await ctx.service.category.getCategory();
    ctx.body = category;
  }
}

module.exports = CategoryController;