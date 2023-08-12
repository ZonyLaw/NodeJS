const { getDb } = require("../util/database");
const mongodb = require("mongodb");
// const db = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then()
      .catch((err) => {
        console.log(err);
      });

    // alternatively you can use find().next()
  }
}

module.exports = User;
