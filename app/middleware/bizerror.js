module.exports = (options, app) => {
  return async function(ctx, next) {
      await next()
      let body = ctx.body;
      if(!body||!body.code) return;
      switch (body.code) {
        case 10000:
          body.message='库存不足'
          break;
      
        default:
          break;
      }
      ctx.body = body
  }
}