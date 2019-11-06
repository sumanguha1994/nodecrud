const mongoose = require("mongoose");
const schema = mongoose.Schema;

var productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model("crud", productSchema);