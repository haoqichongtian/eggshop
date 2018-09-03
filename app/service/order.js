const Service = require('egg').Service;

class OrderService extends Service{
  constructor(ctx){
    super(ctx);
  }

  /**
   * 下单接口
   * @param {用户user表中id} uid 
   * @param {传递的订单} orderProducts 
   */
  async place(uid,orderProducts){
    this.uid = uid;
    this.orderProducts = orderProducts;
    //[['productId':2,'count':3],['productId':3,'count':3]]
    //[{'productId':2,'count':3},{'productId':3,'count':3}]
    
    let status =await this.compareOrderAndActual(orderProducts);
    if(!status.pass){
      status.order_id = -1;
      return status;
    }
    let snap = await this.snapOrder(status);
    let order = await this.createOrder(snap);
    return order;
  }

  /**
   * 通过传递过来的订单 找到所有的商品的信息
   * @param {订单提交的产品数组} orderProducts 
   */
  async getProductByOrderProducts(orderProducts){
    let ids = [];
    orderProducts.forEach(v=>{
      ids.push(v.product_id);
    })
    let products = await this.app.model.Product.findAll({
      where:{
        id:ids
      }
    })
    return products;
  }
  /**
   * 比较订单与实际商品的状态（库存检测）
   * @param {订单的数组} orderProducts 
   * @param {实际商品的数组} actualProducts 
   */
  async compareOrderAndActual(orderProducts){
    let actualProducts = await this.getProductByOrderProducts(orderProducts);
    let status = {
      'pass':true,
      'orderTotalPrice':0,
      'orderTotalCount':0,
      'orderStatusArray':[]
    };
    orderProducts.forEach(v=>{
      actualProducts.forEach(v2=>{
        if(v.product_id == v2.id){
          let oneStatus = this.compareOneProduct(v,v2);
          status.orderStatusArray.push(oneStatus);
        }
      })
    })
    status.orderStatusArray.forEach(v3=>{
      status.orderTotalCount+=v3.count;
      status.orderTotalPrice+=v3.totalPrice;
      if(!v3.haveStock){
        status.pass = false;
      }
    })
    return status;
  } 

  /**
   * 比较单一商品的状态
   * @param {单一订单商品} orderOne 
   * @param {单一实际商品} actualOne 
   */
  compareOneProduct(orderOne,actualOne){
    let oneStatus = {
      'id':null,
      'haveStock':true,
      'count':orderOne.count,
      'name':actualOne.name,
      'totalPrice':actualOne.price*orderOne.count,
      'price':actualOne.price,
      'img':actualOne.main_img_url
    }
    if(orderOne&&actualOne){
      oneStatus.id = actualOne.id;
    }
    if(orderOne.count>actualOne.stock){
      oneStatus.haveStock = false;
    }
    return oneStatus;
  }

  /**
   * 生成订单的快照
   * @param {订单状态} status 
   */
  async snapOrder(status){
    let snap = {
      'totalPrice':status.orderTotalPrice,
      'totalCount':status.orderTotalCount,
      'name':status.orderStatusArray[0].name,
      'img':status.orderStatusArray[0].img,
      'pStatus':status.orderStatusArray,
      'snapAddress':''
    }
    if(status.orderStatusArray.length>1){
      snap.name+='等';
    }
    snap.snapAddress = await this.getOrderAddress();
    return snap;
  }

  /**
   * 获取订单地址
   */
  async getOrderAddress(){
    return await this.ctx.service.address.getAddressByUid(this.uid);
  }

  /**
   * 生成订单号
   */
  makeOrderNo(){
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 89 + 100)).toString()
  }

  /**
   * 通过当时的快照创建订单并写入数据库
   * @param {快照的数据} snap 
   */
  async createOrder(snap){
    const user_id = this.uid,
      order_no = this.makeOrderNo(),
      total_price = snap.totalPrice,
      snap_name = snap.name,
      total_count = snap.totalCount,
      snap_items = JSON.stringify(snap.pStatus),
      snap_address = JSON.stringify(snap.snapAddress),
      snap_img = snap.img;

      let order = await this.app.model.Order.create({user_id,order_no,total_price,snap_name,total_count,snap_items,snap_address,snap_img});
      this.orderProducts.forEach(v=>{
        v.order_id = order.id;
      })
      
      await this.app.model.OrderProduct.bulkCreate(this.orderProducts);

      return {
        'order_no':order_no,
        'order_id':order.id,
        'create_time':Date.now()
      }
  }

  /**
   * 通过uid 查找用户的历史订单（分页查询）
   * @param {用户id} uid 
   */
  async getSummaryByUid(uid,page,pageSize){
    let pageData;
    if(uid){
      pageData = await this.app.model.Order.findAndCountAll({
        where:{
          user_id:uid
        },
        offset: (page-1)*pageSize,
        limit: Number(pageSize)
      })
    }else{
      console.log('111111111111');
      pageData = await this.app.model.Order.findAndCountAll({
        offset: (page-1)*pageSize,
        limit: Number(pageSize)
      })
    }
    return pageData; 
  }
  
  
}

module.exports = OrderService;