const express = require("express");
const { cartModel } = require("../db/db");
const cartRouter = express.Router();

// <--------------------Postrequest-------------------------->

cartRouter.post("/add", async (req, res) => {
  const newItem = req.body;
  try {
    const createdItem = await cartModel.create(newItem);
    res.json(createdItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating an item." });
  }
});

// <--------------------getrequest-------------------------->

cartRouter.get("/", async (req, res) => {
  try {
    const items = await cartModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

// <--------------------updaterequest-------------------------->

cartRouter.patch("/update/:id", async (req, res) => {
  const itemId = req.params.id;
  const updates = req.body;

  try {
    const updatedItem = await cartModel.findByIdAndUpdate(itemId, updates, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the item" });
  }
});

// <--------------------deleterequest-------------------------->

cartRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInvoice = await cartModel.findByIdAndDelete(id);

    if (deletedInvoice) {
      res.json({ message: "Invoice deleted successfully" });
    } else {
      res.status(404).json({ error: "Invoice not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete invoice" });
  }
});

module.exports = {
  cartRouter,
};
