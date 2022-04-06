const cors = require("cors");
const express = require("express");
const Jwt = require("jsonwebtoken");
require("./database/configDB");
const User = require("./database/user");
const Product = require("./database/product");
const jwtkey = "e-comm";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  if (result) {
    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ response: "Something went wrong" });
      } else {
        res.send({ result, auth: token });
      }
    });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body).select("-password");
  if (user) {
    Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ response: "Something went wrong" });
      } else {
        res.send({ user, auth: token });
      }
    });
  } else {
    res.send({ response: "no data found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  if (result) {
    res.send(result);
  }
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no products found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no products found" });
  }
});
app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});
app.get("/search/:key", verifyToken, async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(401).send({ response: "Provide Valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ response: "Token not found" });
  }
}

app.listen(3001, () => {
  console.log("Listening to port 3001");
});
