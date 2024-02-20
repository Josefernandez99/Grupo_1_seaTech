module.exports = (sequelize, DataTypes) => {
  let alias = 'Rol'
  let colums = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
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
    tableName: 'Roles',
    timestamp: true
  }

  const Rol = sequelize.define(alias, colums, configuration);

  //Asociacion 
  Rol.associate = (models) => {
    Rol.hasMany(models.User,
      {
        as: 'tiene_muchos_users',
        foreignKey: 'rol'
      }
    )
  }

  return Rol;
}