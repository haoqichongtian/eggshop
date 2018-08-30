const Service = require('egg').Service;

class CategoryService extends Service{
  constructor(ctx){
    super(ctx);
  }

  async getCategory(id){
    let category;
    if(id){
      category = await this.app.model.Category.findAll({
        where:{
          id:id
        },
        include:{
          model:this.app.model.Product
        }
      })
    }else{
      category = await this.app.model.Category.findAll({
      })
    }
    return { category };
  }
}

module.exports = CategoryService;

