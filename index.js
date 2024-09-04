const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoute = require("./routes/userRoute");
const invoiceRoute = require("./routes/InvoiceRoute");
const connectDb = require('./config/connectDb');

// Config dot env file
dotenv.config();

// Database connection
connectDb();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Apply relaxed CORS policy
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow all standard methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow standard headers
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
}));

app.get("/", (req, res) => {
    res.json("Hello");
});

// User routes
app.use("/api/users", userRoute);
app.use("/api/invoice", invoiceRoute);

// Port
const PORT = process.env.PORT || 8080;

// Listen server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
