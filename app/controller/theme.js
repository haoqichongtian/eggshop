'use strict';

const Controller = require('egg').Controller;

class ThemeController extends Controller {
  async getSimpleList() {
    const ctx = this.ctx;
    const ids = ctx.request.query.ids;
    const themeList = await ctx.service.theme.getTopic(ids);
    ctx.body = themeList;
    
  }

  async getComplexOne() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const themeInfo = await ctx.service.theme.getThemeInfo(id);
    ctx.body = themeInfo;
    
  }
}

module.exports = ThemeController;
