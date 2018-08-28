'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async getRecent() {
    const ctx = this.ctx;
    const count = ctx.params.count;
    console.log(count);
    const recent = await ctx.service.product.getRecent(count);
    ctx.body = recent;
    
  }

  async getProperty() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const recent = await ctx.service.product.getProperties(id);
    ctx.body = recent;
    
  }
}

module.exports = ProductController;
