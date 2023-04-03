// destructures the sequelize 'model' and 'datatypes' classes to be used in the Post model
const { Model, DataTypes } = require('sequelize');

// imports the sequelize connection from the config folder
const sequelize = require('../config/connection');

// creates the post class, which is a subclass of the Model class
class Post extends Model { }

// initialize the Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// export the Post model
module.exports = Post;