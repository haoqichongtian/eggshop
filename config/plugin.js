'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};

// exports.mysql = {
//   enable: true,
//   package: 'egg-mysql',
// };

// exports.sequelize = {
//   enable: true,
//   package: 'egg-sequelize',
// };

// exports.redis = { 
//   enable: true, 
//   package: 'egg-redis', 
// }; 

exports.validate = {
  enable: true,
  package: 'egg-validate',
};