module.exports = (sequelize, DataTypes) => {
  let alias = 'Cart_Item_Compra'
  let colums = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_cart_item: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_compra: {
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
  }
  let configuration = {
    tableName: 'Cart_Items_Compras',
    timestamp: true
  }

  const Cart_Item_Compra = sequelize.define(alias, colums, configuration);

  //Asociacion 
  Cart_Item_Compra.associate = (models) => {
    //Relación con la tabla Compra
    Cart_Item_Compra.belongsTo(models.Compra,
      {
        as: 'relacion_intermedia_con_compra',
        foreignKey: 'id_compra'
      }
    )

    //Relación con la tabla Cart_Item
    Cart_Item_Compra.belongsTo(models.Cart_Item,
      {
        as: 'relacion_intermedia_con_cart_item',
        foreignKey: 'id_cart_item'
      }
    )
  }

  return Cart_Item_Compra;
}