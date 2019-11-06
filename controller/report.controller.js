const mongoose = require("mongoose");
const saleModel = require("../model/sale.model");
const crudModel = require("../model/crud.model");
const dbconfig = require("../dbconfig");

//dbset
mongoose.connect(dbconfig.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("db connected");
}).catch((error) => {
    console.log(`error occured: ${error}`);
});

//ctrl logic
module.exports.generate = async (req, res) => {
    try {
        await crudModel.aggregate([{
            $lookup: {
                from: "sales",
                localField: "_id",
                foreignField: "crud_id",
                as: "salling",
            }
        }]).then((data) => {
            res.status(200).send({msg: data});
        }).catch(error => {
            res.status(500).send({msg: error});
        });
    }catch(error){
        res.status(500).send({msg: error});   
    }
}