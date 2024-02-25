const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {type: String},
    title: {type: String},
    price: {type: String},
    description: {type: String},
    category:{type: String},
    image: {type: String},
    sold: {type: String}
},{ timestamps: true })

const Emps = new mongoose.model("Emp", userSchema);

module.exports = Emps;