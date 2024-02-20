module.exports = (sequelize, DataTypes) => {
  let alias = 'Product'
  let colums = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    uuid: {
      type: DataTypes.UUID
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    state_embarcation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }
  let configuration = {
    tableName: 'Products',
    paranoid: true,
    timestamp: true
  }

  const Product = sequelize.define(alias, colums, configuration);

  //Asociacion 
  Product.associate = (models) => {
    //Relación con la tabla Category
    Product.belongsTo(models.Category,
      {
        as: 'tiene_una_category',
        foreignKey: 'id_category'
      }
    )
    //Relación con la tabla User (relacion de pertenencia con usuario)
    Product.belongsTo(models.User,
      {
        as: 'es_de_un_user',
        foreignKey: 'id_user'
      }
    )
    //Relación con la tabla User (relacion de carrito)
    Product.belongsToMany(models.User,
      {
        as: 'puede_ser_comprado_por_muchos_users',
        through: 'Cart_Items',
        foreignKey: 'id_product',
        otherKey: 'id_user',
        timestamps: true
      }
    )
    //Relación con la tabla pivot/intermedia de User (CARRITO) (relacion con tabla intermedia)
    Product.hasMany(models.Cart_Item,
      {
        as: 'es_uno_de_muchos_cart_items',
        foreignKey: 'id_product'
      }
    )

  }

  return Product;
}