// const products = [];
const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFrom = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      const products = JSON.parse(fileContent);
      cb(products);
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFrom((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        console.log("spread", updatedProducts[existingProductIndex]);
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  // fs.readFile(p, (err, fileContent) => {
  //   let products = [];
  //   if (!err) {
  //     products = JSON.parse(fileContent);
  //   }

  //   products.push(this);
  //   fs.writeFile(p, JSON.stringify(products), (err) => {
  //     console.log(err);
  //   });
  // });

  static fetchAll(cb) {
    getProductsFrom(cb);
  }

  static findById(id, cb) {
    getProductsFrom((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
