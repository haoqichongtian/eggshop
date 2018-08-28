'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/banner', controller.home.banner);

  router.get('/theme', controller.theme.getSimpleList);
  router.get('/theme/:id', controller.theme.getComplexOne);

  router.get('/product/recent/:count?', controller.product.getRecent);
  router.get('/product/property/:id',controller.product.getProperty);

  router.get('/category/:id',controller.category.getOneCategory);
  router.get('/category/all',controller.category.getCategory);


  router.post('/token/user',controller.token.getToken);
};
