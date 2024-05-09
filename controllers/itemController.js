const itemModel = require("../models/itemModel");
const { connect } = require('mongoose')
require("dotenv").config();

// get items
const getItemController = async (req, res) => {
  try {
    await connect(process.env.MONGO_URL)
    const items = await itemModel.find();
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//add items
const addItemController = async (req, res) => {
  const { name, price, category, image } = req.body
  if (!name || !price || !category || !image) {
    res.status(403).json({ message: "input field required" })
  }
  else {
    try {
      await connect(process.env.MONGO_URL)
      await itemModel.create({ name, price, category, image })
      const items = await itemModel.find()
      res.status(201).json({
        message: "Item Added Successfully",
        items
      });

    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }
};

//update item
const editItemController = async (req, res) => {
  try {
    const { _id, name, price, category, image } = req.body;
    // console.log(itemId);
    const filter = { _id };
    const update = { name, price, category, image };

    await connect(process.env.MONGO_URL)
    await itemModel.findOneAndUpdate(filter, update, { new: true });
    const items = await itemModel.find()
    res.status(200).json({
      message: "Item Updated Successfully",
      items
    });
  } catch (error) {
    // res.status(400).send(error);
    res.status(500).json({ error: error.message });

  }
};
//delete item
const deleteItemController = async (req, res) => {
  try {
    const { _id } = req.body;
    await connect(process.env.MONGO_URL)
    // console.log(itemId);
    await itemModel.findOneAndDelete({ _id });
    const items = await itemModel.find()
    res.status(200).json({
      message: "Item Deleted Successfully",
      items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
