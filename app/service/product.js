'use strict';

const Service = require('egg').Service;
class ProductService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * 获取最新的商品列表
   */
  async getRecent(count=15) {
    count = Number(count);
    let recent = await this.app.model.Product.findAll({
      limit: count,
      order: [
        ['create_time', 'DESC'],
      ]
    });
    return { recent };
  }

  async getProperties(id) {
    let productInfo = await this.app.model.Product.findAll({
      where:{
        id:id
      },
      include:[
        {
          model:this.app.model.ProductImage,
          as:'image'
        },
        {
          model:this.app.model.ProductProperty,
          as:'properties'
        }
      ]
    });
    return { productInfo };
  }
  
}

module.exports = ProductService;