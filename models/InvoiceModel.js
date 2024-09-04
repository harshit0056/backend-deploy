const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  description: { type: String, required: false },
  amount: { type: Number, required: true },
  cost: { type: Number, required: true },
});

const invoiceSchema = new mongoose.Schema({
  billedFrom: {
    sender: { type: String, required: true },
    slogan: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  billTo: {
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
  },
  items: [itemSchema],
  email :{ type: String, required: true },
  invoiceNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
