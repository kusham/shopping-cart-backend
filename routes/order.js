const express = require("express");
const router = express.Router();
const orderSchema = require("../models/order");

//add a order
router.post("/addOrder", async (req, res) => {
  const newOrder = new orderSchema(req.body);
  try {
    console.log(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(404).json(error);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await orderSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await orderSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", async (req, res) => {
  try {
    const orders = await orderSchema.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL
router.get("/", async (req, res) => {
  try {
    const orders = await orderSchema.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//   // GET MONTHLY INCOME

//   router.get("/income", async (req, res) => {
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//     try {
//       const income = await orderSchema.aggregate([
//         { $match: { createdAt: { $gte: previousMonth } } },
//         {
//           $project: {
//             month: { $month: "$createdAt" },
//             sales: "$amount",
//           },
//         },
//         {
//           $group: {
//             _id: "$month",
//             total: { $sum: "$sales" },
//           },
//         },
//       ]);
//       res.status(200).json(income);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;
