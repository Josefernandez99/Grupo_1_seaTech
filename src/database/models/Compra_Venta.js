module.exports = (sequelize, DataTypes) => {
  let alias = 'Compra_Venta'
  let colums = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_compra: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_venta: {
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
    }
  }
  let configuration = {
    tableName: 'Compras_Ventas',
    timestamp: true
  }

  const Compra_Venta = sequelize.define(alias, colums, configuration);

  //Asociacion 
  Compra_Venta.associate = (models) => {

    Compra_Venta.belongsTo(models.Compra,
      {
        as: 'relacion_intermedia_con_compra',
        foreignKey: 'id_compra'
      }
    )

    Compra_Venta.belongsTo(models.Venta,
      {
        as: 'relacion_intermedia_con_venta',
        foreignKey: 'id_venta'
      }
    )

  }

  return Compra_Venta;
}