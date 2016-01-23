/**
 * Created by longNightKing on 1/16/16.
 */
var router = require('express').Router();
var ShoppingCartCtrl = require('../controller/ShoppingCartCtrl');

/* GET all the products currently in the shoppingcart by user id */
router.get('/:userId', function(req, res) {
    var userId  = req.params.userId;
    ShoppingCartCtrl.getShoppingItemsByUser(userId, function(items){
        if(items){
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(items));
        }else{
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify([]));
        }
    });
});

/* push all products into shoppingcart */
router.post('/addall/:userId', function(req, res, next) {
    var userId  = req.params.userId;
    var items = req.body.items;
    ShoppingCartCtrl.addAll(userId, JSON.parse(items), function(isSucceed){
        if(isSucceed){
            res.writeHead(200);
            res.end("OK");
        }else{
            res.writeHead(201);
            res.end("failed");
        }
    });
});


/* add a product into shoppingcart */
router.post('/add/:userId', function(req, res, next) {
    var userId  = req.params.userId;
    var item = req.body;
    ShoppingCartCtrl.addProduct(userId, item, function(isSucceed){
        if(isSucceed){
            res.writeHead(200);
            res.end("OK");
        }else{
            res.writeHead(201);
            res.end("failed");
        }
    });
});

/* remove a product from shoppingcart */
router.delete('/remove/:userId', function(req, res, next) {
    var userId  = req.params.userId;
    var sku = req.body.sku;
    ShoppingCartCtrl.removeProduct(userId, sku, function(isSucceed){
        if(isSucceed){
            res.writeHead(200);
            res.end("OK");
        }else{
            res.writeHead(404);
            res.end("not exist");
        }
    });
});

/* product increment */
router.post('/increment/:userId', function(req, res, next) {
    var userId  = req.params.userId;
    var sku = req.body.sku;
    ShoppingCartCtrl.productQtyIncrement(userId, sku, function(isSucceed){
        if(isSucceed){
            res.writeHead(200);
            res.end("OK");
        }else{
            res.writeHead(404);
            res.end("not exist or failed");
        }
    });
});

/* product decrement */
router.post('/decrement/:userId', function(req, res, next) {
    var userId  = req.params.userId;
    var sku = req.body.sku;
    ShoppingCartCtrl.productQtyDecrement(userId, sku, function(isSucceed){
        if(isSucceed){
            res.writeHead(200);
            res.end("OK");
        }else{
            res.writeHead(404);
            res.end("not exist or failed");
        }
    });
});

module.exports = router;