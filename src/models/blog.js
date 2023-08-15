const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Blog = sequelize.define("Blog", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    require: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
	slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    require: true
  },
});

module.exports = Blog;
