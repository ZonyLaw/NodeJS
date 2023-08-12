const { getDb } = require("../util/database");
const mongodb = require("mongodb");
// const db = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
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

  addToCart(product) {
    // const cartProduct = this.cart.item.findIndex((cp) => {
    //   return cp._id === product._id;
    // });

    const updatedCart = {
      items: [{ productId: new ObjectId(product._id), quantity: 1 }],
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
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
