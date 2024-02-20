const imgUserDefault = {
  public_id: 'seatech/user_default_image',
  url: 'https://res.cloudinary.com/draudtuyr/image/upload/v1705370913/seatech/user_default_image.jpg'
};

module.exports = (sequelize, DataTypes) => {
  let alias = 'User'
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
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
      defaultValue: JSON.stringify(imgUserDefault)
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'Users',
    timestamp: true,
    paranoid: true
  }

  const User = sequelize.define(alias, colums, configuration);

  //Asociacion 
  User.associate = (models) => {
    //Relación con la tabla Rol
    User.belongsTo(models.Rol,
      {
        as: 'tiene_un_rol',
        foreignKey: 'rol'
      }
    )
    //Relación con la tabla Product (relacion de pertenencia de productos)
    User.hasMany(models.Product,
      {
        as: 'tiene_muchos_products',
        foreignKey: 'id_user'
      }
    )
    //Relación con la tabla Product (relacion de carrito)
    User.belongsToMany(models.Product,
      {
        as: 'puede_comprar_muchos_products',
        through: 'Cart_Items',
        foreignKey: 'id_user',
        otherKey: 'id_product',
        timestamps: true
      }
    )
    //Relación con la tabla pivot/intermedia de Product (CARRITO) (relacion con tabla intermedia)
    User.hasMany(models.Cart_Item,
      {
        as: 'tiene_muchos_cart_items',
        foreignKey: 'id_user'
      }
    )
    //Relación con la tabla Compras
    User.hasMany(models.Compra,
      {
        as: 'puede_hacer_muchas_compras',
        foreignKey: 'id_user'
      }
    )

    //Relación con la tabla Venta
    User.hasMany(models.Venta,
      {
        as: 'tiene_muchas_ventas',
        foreignKey: 'id_user'
      }
    )
  }

  return User;
}