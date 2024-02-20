module.exports = (sequelize, DataTypes) => {
  let alias = 'Cart_Item'
  let colums = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.FLOAT,
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
    tableName: 'Cart_Items',
    paranoid: true,
    timestamp: true
  }

  const Cart_Item = sequelize.define(alias, colums, configuration);

  //Asociacion 
  Cart_Item.associate = (models) => {
    //Relación con la tabla User
    Cart_Item.belongsTo(models.User,
      {
        as: 'es_de_un_user',
        foreignKey: 'id_user'
      }
    )
    //Relación con la tabla Product
    Cart_Item.belongsTo(models.Product,
      {
        as: 'contiene_un_product',
        foreignKey: 'id_product'
      }
    )
    //Relación con la tabla Compra
    Cart_Item.belongsToMany(models.Compra,
      {
        as: 'esta_presente_en_muchas_compras',
        through: 'Cart_Items_Compras',
        foreignKey: 'id_cart_item',
        otherKey: 'id_compra',
        timestamps: true
      }
    )
    //Relación con la tabla pivot/intermedia de Compra (relacion con tabla intermedia)
    Cart_Item.hasMany(models.Cart_Item_Compra,
      {
        as: 'compra_relacion_intermedia_cart_item_compra',
        foreignKey: 'id_cart_item'
      }
    )
  }

  return Cart_Item;
}