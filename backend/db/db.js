const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb+srv://preetikushwaha0110:kushwaha@cluster0.lx2vm2y.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const cartSchema = mongoose.Schema(
  {
    nitem: String,
    quantity: Number,
    rate: Number,
    amount: Number,
  },
  {
    versionKey: false,
  }
);

const cartModel = mongoose.model("cartDetails", cartSchema);

module.exports = {
  connection,
  cartModel,
};
