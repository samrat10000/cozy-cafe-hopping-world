require('dotenv').config();
const mongoose = require('mongoose');

console.log("TEST: Starting...");
console.log("TEST: MONGO_URI is", process.env.MONGO_URI ? "DEFINED" : "UNDEFINED");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("TEST: Connected Successfully!");
    process.exit(0);
})
.catch(err => {
    console.error("TEST: Connection Failed:", err.message);
    process.exit(1);
});
