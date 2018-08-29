const moment = require('moment');
const md5 = require('md5');


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
  return result.data;
}

exports.getRandChar = function(len){
  let str = '';
  let rangeStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
  let max = rangeStr.length-1;
  for(var i = 0;i<max;i++){
    str += rangeStr[Math.random(0,max)];
  }
  return str;
}

exports.md5serect = function(str){
  return md5(str);
}
