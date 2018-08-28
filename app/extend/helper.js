const moment = require('moment');
exports.relativeTime = time => moment(new Date(time)).fromNow();

exports.sprintf = function(){
  var arg = arguments,
  str = arg[0] || '',
  i, n;
  for (i = 1, n = arg.length; i < n; i++) {
    str = str.replace(/%s/, arg[i]);
  }
return str;}

exports.request = async function(api, opts) {
  const options = Object.assign({
    dataType: 'json',
    timeout: [ '30s', '30s' ],
  }, opts);

  const result = await this.ctx.curl(api, options);
  console.log(result);
  return result.data;
}