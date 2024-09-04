const express = require('express');
const router = express.Router();
const Invoice = require('../models/InvoiceModel');

router.post('/add', async (req, res) => {
    try {
      const invoiceData = req.body;
      const totalAmount = invoiceData.items.reduce((acc, item) => acc + (item.amount * item.cost), 0);
  
      const newInvoice = new Invoice({
        ...invoiceData,
        amount: totalAmount, 
      });
  
      await newInvoice.save();
      res.status(201).json(newInvoice);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


router.get('/all', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/by-sender-email', async (req, res) => {
    try {
        // console.log(req);
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: 'Sender email is required' });
      }
      const invoices = await Invoice.find({ 'email': email });
      if (invoices.length === 0) {
        return res.status(404).json({ message: 'No invoices found for the given email' });
      }
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router;