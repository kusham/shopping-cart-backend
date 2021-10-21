const cartSchema = require("../models/cart");
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newCart = new cartSchema(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await cartSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await cartSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET USER CART
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await cartSchema.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const carts = await cartSchema.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
