
// imports the user model
const User = require("./User");

// imports the post model
const Post = require("./Post");

// method provided by sequelize to create associations between models
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// method provided by sequelize to associate post model with user model
Post.belongsTo(User, {
  foreignKey: "owner_id",
});

// exports the user and post models
module.exports = { User, Post };