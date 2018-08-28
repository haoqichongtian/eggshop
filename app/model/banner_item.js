/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('banner_item', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    img_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    key_word: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    delete_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    banner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    timestamps: false, 
    tableName: 'banner_item'
  });

  Model.associate = function() {
    app.model.BannerItem.belongsTo(app.model.Image, { foreignKey: 'img_id', targetKey: 'id' });
  }

  return Model;
};
