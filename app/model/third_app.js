/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('third_app', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    app_id: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    app_secret: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    app_description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    scope: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    scope_description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    delete_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    timestamps: false, 
    tableName: 'third_app'
  });

  Model.associate = function() {

  }

  return Model;
};
