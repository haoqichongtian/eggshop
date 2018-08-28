/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('theme', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    topic_img_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    delete_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    head_img_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    timestamps: false, 
    tableName: 'theme'
  });

  Model.associate = function() {
    app.model.Theme.belongsTo(app.model.Image, {as:"topic", foreignKey: 'topic_img_id', targetKey: 'id' });
    app.model.Theme.belongsTo(app.model.Image, {as:"head", foreignKey: 'head_img_id', targetKey: 'id' });
    app.model.Theme.belongsToMany(app.model.Product, {as:"product",through:app.model.ThemeProduct, foreignKey: 'theme_id', otherKey: 'product_id' });
  }

  return Model;
};
