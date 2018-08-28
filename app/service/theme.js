'use strict';

const Service = require('egg').Service;
class ThemeService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * get top story ids
   */
  async getTopic(ids) {
    let paramArr;
    if(ids){
      paramArr= ids.split(',');
    }
    let themelist = await this.app.model.Theme.findAll({
      include:[
        {
          model: this.app.model.Image,
          as:'topic',
          attributes: ['url'] 
        },
        {
          model: this.app.model.Image,
          as:'head',
          attributes: ['url'] 
        }
      ],
      where:{
        id:paramArr
      }, 
      attributes: ['id']  
    });
    return { themelist };
    
  }
/**
 * 获取主题下的商品
 * @param {主题的id} id 
 */
  async getThemeInfo(id) {
    let themeInfo = await this.app.model.Theme.findAll({
      include:[
        {
          model: this.app.model.Product,
          as:'product',
        },
      ],
      where:{
        id:id
      },  
    });
    return { themeInfo };
    
  }

  
}

module.exports = ThemeService;