module.exports = (sequelize, DataTypes) => {
  let alias = 'Venta'
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.FLOAT,
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
    tableName: 'Ventas',
    paranoid: true,
    timestamp: true
  }

  const Venta = sequelize.define(alias, colums, configuration);

  //Asociacion 
  Venta.associate = (models) => {
    //Relación con la tabla User
    Venta.belongsTo(models.User,
      {
        as: 'relacion_intermedia_con_user',
        foreignKey: 'id_user'
      }
    )
    //Relación con la tabla Compras
    Venta.belongsToMany(models.Compra,
      {
        as: 'pertenece_a_muchas_compras',
        through: 'Compras_Ventas',
        foreignKey: 'id_venta',
        otherKey: 'id_compra',
        timestamps: true
      }
    )
    //Relación con la tabla pivot/intermedia de Compras (relacion con tabla intermedia)
    Venta.hasMany(models.Compra_Venta,
      {
        as: 'relacion_intermedia_compra_venta',
        foreignKey: 'id_venta'
      }
    )
  }

  return Venta;
}