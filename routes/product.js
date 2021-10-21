const express = require("express");
const router = express.Router();
const productSchema = require("../models/product");

//add a product
router.post("/addProduct", async (req, res) => {
  const newProduct = new productSchema({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    quantityAvalble: req.body.quantityAvalble,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(404).json(error);
  }
});

// edit a product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await productSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(403).json(error);
  }
});

// delete a product
router.delete("/:id", async (req, res) => {
  try {
    await productSchema.findByIdAndDelete(req.params.id);
    res.status(201).json("product has been deleted...");
  } catch (error) {
    res.status(403).json(error);
  }
});

// get a product
router.get("/find/:id", async (req, res) => {
  try {
   const recievedProduct = await productSchema.findById(req.params.id);
    res.status(200).json(recievedProduct);
  } catch (error) {
    res.status(404).json(error);
  }
});

// get all products
router.get("/", async (req, res) => {
  try {
   const recievedProducts = await productSchema.find();
    res.status(200).json(recievedProducts);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
