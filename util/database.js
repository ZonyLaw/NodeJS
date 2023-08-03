const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://Sunny:${process.env.DB_PASSWORD}@cluster0.ars0ie4.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("connected");
      console.log(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   "node-complete",
//   "root",
//   process.env.DB_PASSWORD,
//   {
//     dialect: "mysql",
//     host: "localhost",
//   }
// );

// module.exports = sequelize;
