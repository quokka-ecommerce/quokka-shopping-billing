/**
 * Created by longNightKing on 1/18/16.
 */
var router = require('express').Router();
//var CheckOutCtrl = require('../controller/CheckOutCtrl');

/* GET all the products currently in the shoppingcart by user id */
router.get('/', function(req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("sbsbbs");
});

module.exports = router;