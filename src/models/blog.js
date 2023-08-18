const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Blog = sequelize.define("Blog", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  categoryId: {
    type: DataTypes.BIGINT,
    allowNull: true,
    require: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    require: true,
  },
});

module.exports = Blog;
