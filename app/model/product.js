/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('product', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    delete_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    main_img_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    from: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    summary: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    img_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    timestamps: false, 
    tableName: 'product'
  });

  Model.associate = function() {
    app.model.Product.belongsTo(app.model.Image, {as:"img", foreignKey: 'img_id', targetKey: 'id' });
    app.model.Product.hasMany(app.model.ProductProperty,{as:'properties',foreignKey:'product_id', targetKey: 'id'});
    app.model.Product.hasMany(app.model.ProductImage,{as:'image',foreignKey:'product_id', targetKey: 'id'});
  }

  return Model;
};
