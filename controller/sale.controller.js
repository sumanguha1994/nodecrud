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

//ctrl logics
module.exports.addctrl = async (req, res) => {
    try {
        let sale = new saleModel(req.body);
        await sale.save().then(() => {
            //update crud quantity
            crudModel.findById(req.body.crud_id).exec().then((data) => {
                let quantity = data.quantity - (req.body.quantity == null || undefined ? 1 : req.body.quantity);
                updateProduct(req.body.crud_id, quantity);
                res.status(200).send({msg: "sale value inserted"});
            }).catch(error => {
                res.status(500).send({msg: error});
            });
        }).catch(error => {
            res.status(500).send({msg: error});
        });
    }catch(error){
        res.status(500).send({msg: error});   
    }
};
module.exports.getSale = async (req, res) => {
    try {
        await crudModel.findById(req.params.crud_id).exec().then((data) => {
            res.status(200).send({msg: data});
        }).catch((error) => {
            res.status(500).send({msg: error});
        });
    }catch(error){
        res.status(500).send({msg: error});   
    }
};
module.exports.updateSale = async (req, res) => {
    try {
        await saleModel.findById(req.params.id).exec().then((data) => {
            let updateObj = {
                "crud_id": req.body.crud_id == null || undefined ? data.crud_id : req.body.crud_id,
                "salling_price": req.body.salling_price == null || undefined ? data.salling_price : req.body.salling_price,
                "quantity": parseInt(data.quantity) + parseInt(req.body.quantity == null || undefined ? o : req.body.quantity),
            }
            saleModel.findByIdAndUpdate(req.params.id, updateObj).exec().then(() => {
                saleModel.findById(req.params.id).exec().then((data) => {
                    //update crud quantity
                    crudModel.findById(data.crud_id).exec().then((value) => {
                        let quantity = parseInt(value.quantity) - parseInt(req.body.quantity == null || undefined ? 1 : req.body.quantity);
                        updateProduct(data.crud_id, quantity);
                    });
                    res.status(200).send({msg: data});
                }).catch(error => {
                    res.status(500).send({mag: error});
                });
            }).catch(error => {
                res.status(500).send({msg: error});
            });
        }).catch(error => {
            res.status(500).send({msg: error});
        }); 
    }catch(error){
        res.status(500).send({msg: error});
    }
};

//crud quantity update
function updateProduct(id, quantity){
    crudModel.findById(id).exec().then((data) => {
        let updateObj = {
            "name": data.name,
            "price": data.price,
            "type": data.type,
            "quantity": quantity == null || undefined ? data.quantity : quantity,
        }
        crudModel.findByIdAndUpdate(id, updateObj).exec().then(() => {
            return true;
        }).catch(error => {
            console.log(`err occured: ${error}`);
            process.exit(-1);
        })
    }).catch(error => {
        console.log(`error occured: ${error}`);
        process.exit(-1);
    });
}