const express = require('express');
const galti = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const connectDb = require('./config/dbConnection');

connectDb();
const rukt = express();


const port = process.env.PORT || 5000;


rukt.use(express.json()) ;
rukt.use("/api/contacts", require("./routes/contactRouter"));
rukt.use("/api/users", require("./routes/userRoutes"))

rukt.use(galti)
rukt.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
