module.exports = (sequelize, DataTypes) => {
  let alias = 'Category'
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
    tableName: 'Categories',
    timestamp: true
  }

  const Category = sequelize.define(alias, colums, configuration);

  //Asociacion 
  Category.associate = (models) => {
    Category.hasMany(models.Product,
      {
        as: 'tiene_muchos_products',
        foreignKey: 'id_category'
      }
    )
  }

  return Category;
}