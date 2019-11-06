const mongoose = require("mongoose");
const model = require("../model/crud.model");
const dbConfig = require("../dbconfig");

//dbset
mongoose.connect(dbConfig.db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//ctrl logics
module.exports.homectrl = async (req, res) => {
    res.status(200).send({msg: "listeing from crud.controller"});
};
module.exports.addctrl = async (req, res) => {
    try {
        let product = new model(req.body);
        let result = product.save();
        res.status(200).send({msg: "product inserted"});
    }catch(error){
        res.status(500).send({msg: error});
    }
};
module.exports.allProducts = async (req, res) => {
    try {
        await model.find({}).exec().then((data) => {
            res.status(200).send({msg: data});
        }).catch((error) => {
            res.status(500).send({msg: error});
        });
    }catch(error){
        res.status(500).send({msg: error});   
    }
};
module.exports.getProduct = async (req, res) => {
    try {
        await model.findById(req.params.id).exec().then((data) => {
            res.status(200).send({msg: data});
        }).catch((error) => {
            res.status(403).send({msg: error});
        });
    }catch(error){
        res.status(500).send({msg: error});
    }
};
module.exports.deleteProduct = async (req, res) => {
    try {
        await model.findByIdAndRemove(req.params.id).exec().then(() => {
            res.status(200).send({msg: "product deleted"});
        }).catch((error) => {
            res.status(500).send({msg: error});
        });
    }catch(error){
        res.status(500).send({msg: error});   
    }
};
module.exports.updateProduct = async (req, res) => {
    try {
        await model.findById(req.params.id).exec().then((data) => {
            let updateObj = {
                "name": req.body.name == null || undefined ? data.name : req.body.name,
                "price": req.body.price == null || undefined ? data.price : req.body.price,
                "type": req.body.type == null || undefined ? data.type : req.body.type,
                "quantity": req.body.quantity == null || undefined ? data.quantity : req.body.quantity,
            }
            model.findByIdAndUpdate(req.params.id, updateObj).then(() => {
                model.findById(req.params.id).then((data) => {
                    res.status(200).send({msg: "product updated", data: data});
                }).catch((error) => {
                    res.status(500).send({msg: error});
                });
            }).catch((error) => {
                res.status(500).send({msg: error});
            });
        }).catch((error) => {
            res.status(500).send({msg: error});
        });
    }catch(error){
        res.status(500).send({msg: error});   
    }
};