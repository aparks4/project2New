const mongoose = require('mongoose');
require('dotenv').config();

// update <username> and <password> with your credentials
const connectionStr = process.env.MONGODB_URI

console.log(connectionStr)
mongoose.connect(connectionStr || "code101@abnb.o7jlggi.mongodb.net/?retryWrites=true&w=majority")

mongoose.connection.on('connected', () => {
  console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`)
});

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error 😥', error);
});

mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected  ⚡️ 🔌 ⚡️'));