'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/banner/:id', controller.home.banner);

  router.get('/theme', controller.theme.getSimpleList);
  router.get('/theme/:id', controller.theme.getComplexOne);

  router.get('/product/recent/:count?', controller.product.getRecent);
  router.get('/product/property/:id',controller.product.getProperty);

  router.get('/category/:id',controller.category.getOneCategory);
  router.get('/category/all',controller.category.getCategory);


  router.post('/token/user',controller.token.getToken);
  router.post('/token/verify',controller.token.verifyToken);
  router.post('/token/app',controller.token.getAppToken);

  router.post('/address',controller.address.createOrUpdateAddress);
  router.post('/address/getAddress',controller.address.getAddress);

  router.post('/order',controller.order.placeOrder);
  router.post('/order/:id',controller.order.getDetail);
  router.post('/order/by_user',controller.order.getSummaryByUser);
  router.get('/order/paginate',controller.order.getSummary);

  router.post('/pay/pre_order',controller.pay.getPreOrder);
};
