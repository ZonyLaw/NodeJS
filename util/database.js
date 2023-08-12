const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

require("dotenv").config();

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://Sunny:${process.env.DB_PASSWORD}@cluster0.ars0ie4.mongodb.net/?retryWrites=true&w=majority`
    // `mongodb://Sunny:${process.env.DB_PASSWORD}@192.168.169.241/products`
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

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
