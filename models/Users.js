import { Sequelize } from "sequelize";
import db from "../config/database.js"
import Product from "./Product.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    // Define attributes
    username: {
      type: DataTypes.STRING,
      trim: true,
      required: [true, "Name is required"],
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      minlength: [10, "Password must be at least characters"],
      select: false,
    },
    email: {
      type: DataTypes.STRING,
      trim: true,
      required: [true, "Email is required"],
    },
  },{
    // Freeze Table Name
    freezeTableName: true
});

User.associate = function(models) {
  User.belongsTo(models.Products, {foreignKey: 'productId', as: 'product'})
  User.hasMany(Product,{foreignKey: 'ProductId'})

  return User
};



export default User