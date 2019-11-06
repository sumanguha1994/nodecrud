const mongoose = require("mongoose");
const schema = mongoose.Schema;

var saleSchema = new schema({
    crud_id: {
        type: String,
        required: true
    },
    salling_price: {    
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("sale", saleSchema);