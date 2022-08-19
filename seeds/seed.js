const sequelize = require("../config/connection");
const { User, Blogpost, Comment } = require("../models");

const userData = require("./userData.json");
const blogpostData = require("./blogpostData.json");
const commentData = require("./commentData.json")

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogposts of blogpostData) {
    await Blogpost.create({
      ...blogposts,
    });
  }

  for (const comments of commentData) {
    await Comment.create({
      ...comments,
    });
  }

  process.exit(0);
};

seedDatabase();
