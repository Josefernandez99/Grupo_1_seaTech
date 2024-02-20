module.exports = (sequelize, DataTypes) => {
  let alias = 'Compra'
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
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
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
    tableName: 'Compras',
    paranoid: true,
    timestamp: true
  }

  const Compra = sequelize.define(alias, colums, configuration);

  //Asociacion 
  Compra.associate = (models) => {
    //Relación con la tabla User
    Compra.belongsTo(models.User,
      {
        as: 'fue_realizada_por_un_user',
        foreignKey: 'id_user'
      }
    )
    //Relación con la tabla Cart_Item
    Compra.belongsToMany(models.Cart_Item,
      {
        as: 'contiene_muchos_cart_item',
        through: 'Cart_Items_Compras',
        foreignKey: 'id_compra',
        otherKey: 'id_cart_item',
        timestamps: true
      }
    )
    //Relación con la tabla pivot/intermedia de Cart_Item (relacion con tabla intermedia)
    Compra.hasMany(models.Cart_Item_Compra,
      {
        as: 'compra_relacion_intermedia_cart_item_compra',
        foreignKey: 'id_cart_item'
      }
    )
    //Relación con la tabla Ventas
    Compra.belongsToMany(models.Venta,
      {
        as: 'contiene_muchas_ventas',
        through: 'Compras_Ventas',
        foreignKey: 'id_compra',
        otherKey: 'id_venta',
        timestamps: true
      }
    )
    //Relación con la tabla pivot/intermedia de Ventas (relacion con tabla intermedia)
    Compra.hasMany(models.Compra_Venta,
      {
        as: 'compra_relacion_intermedia_compra_venta',
        foreignKey: 'id_compra'
      }
    )
  }

  return Compra;
}