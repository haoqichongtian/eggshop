/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    openid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    extend: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    timestamps: false, 
    tableName: 'user'
  });

  Model.associate = function() {
    app.model.User.hasOne(app.model.UserAddress,{
      foreignKey:'user_id',targetKey:'id',as:'address'
    })
  }

  return Model;
};
