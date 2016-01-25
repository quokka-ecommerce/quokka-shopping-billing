/**
 * Created by longNightKing on 1/20/16.
 */
var ShoppingCartCtrl = exports;
var TAG = 'ShoppingCartCtrl:';
var schema = 'shopping_cart';
var DBHelper = require('quokka-dao-nodejs');
var MAX_QTY = 1000;

function getCartByUser(userId, callback){
    DBHelper.queryOneByClauseInCollection(schema, {userId: userId}, callback);
}

function initCartForUser(userId, items, callback){
    DBHelper.addOneDocToCollection(schema, {
        userId: userId,
        isActive: true,
        items: items}, callback);
}

function findItemBySKU(items, sku){
    for(var i = 0; i < items.length; i++){
        if(items[i].sku == sku){
            return i;
        }
    }
    return -1;
}

function verifyQtyForItems(items){
    for(var i = 0; i < items.length; i++){
        if(items[i].qty > MAX_QTY){
            items[i].qty = MAX_QTY;
        }else if(items[i].qty <= 0){
            items[i].qty = 1;
        }
    }
}

ShoppingCartCtrl.getShoppingItemsByUser = function(userId, callback){
    getCartByUser(userId, function(err, cart){
        var items = null;
        if(err){
            console.log(TAG, 'getCart: ' + err);
        }else{
            if(cart){
                items = cart.items;
            }
        }
        callback(items);
    });
};

ShoppingCartCtrl.isCartActive = function(userId, callback){
    getCartByUser(userId, function(err, cart){
        var isActive = false;
        if(err){
            console.log(TAG, 'getCart: ' + err);
        }else{
            if(cart){
                isActive = cart.isActive;
            }
        }
        callback(err, isActive);
    });
};

ShoppingCartCtrl.addAll = function(userId, items, callback){
    getCartByUser(userId, function(err, cart){
        if(err){
            console.log(TAG, 'getCart: ' + err);
            callback(false);
        }else{
            verifyQtyForItems(items);
            if(cart){
                for(var i = 0; i < items.length; i++){
                    var matchIndex = findItemBySKU(cart.items, items[i].sku);
                    if(matchIndex < 0){
                        cart.items.push(items[i]);
                    }else{
                        var currQty = Number(cart.items[matchIndex].qty);
                        var addingQty = Number(items[i].qty);
                        if(MAX_QTY - addingQty <= currQty){
                            currQty = MAX_QTY;
                        }else{
                            currQty = currQty + addingQty;
                        }
                        cart.items[matchIndex].set('qty', currQty);
                    }
                }
                cart.markModified('items');
                cart.save(function(){
                    callback(true);
                });
            }else{
                initCartForUser(userId, items, function(err){
                    if(!err){
                        callback(true);
                        console.log(TAG, 'init cart for user(' + userId + ') successfully');
                    }
                });
            }
        }
    });
};

ShoppingCartCtrl.addProduct = function(userId, item, callback){
    getCartByUser(userId, function(err, cart){
        if(err){
            console.log(TAG, 'getCart: ' + err);
            callback(false);
        }else{
            verifyQtyForItems([item]);
            if(cart){
                var matchIndex = findItemBySKU(cart.items, item.sku);
                if(matchIndex < 0){
                    cart.items.push(item);
                }else{
                    var currQty = Number(cart.items[matchIndex].qty);
                    var addingQty = Number(item.qty);
                    if(MAX_QTY - addingQty <= currQty){
                        currQty = MAX_QTY;
                    }else{
                        currQty = currQty + addingQty;
                    }
                    cart.items[matchIndex].set('qty', currQty);
                }
                cart.markModified('items');
                cart.save(function(){
                    callback(true);
                });
            }else{
                initCartForUser(userId, [item], function(err){
                    if(!err){
                        callback(true);
                        console.log(TAG, 'init cart for user(' + userId + ') successfully');
                    }
                });
            }
        }
    });
};

ShoppingCartCtrl.removeProduct = function(userId, sku, callback){
    getCartByUser(userId, function(err, cart){
        if(err){
            console.log(TAG, 'getCart: ' + err);
            callback(false);
        }else{
            if(cart){
                var matchIndex = findItemBySKU(cart.items, sku);
                if(matchIndex < 0){
                    callback(false);
                }else{
                    cart.items.splice(matchIndex, 1);
                    cart.markModified('items');
                    cart.save(function(){
                        callback(true);
                    });
                }
            }else{
                callback(false);
                console.log(TAG, 'cart for user(' + userId + ') is not exist');
            }
        }
    });
};

ShoppingCartCtrl.clear = function(userId, callback){
    getCartByUser(userId, function(err, cart){
        if(err){
            console.log(TAG, 'getCart: ' + err);
            callback(false);
        }else{
            if(cart){
                cart.items.splice(0, cart.items.length);
                cart.markModified('items');
                cart.save(function(){
                    callback(true);
                });
            }else{
                callback(false);
                console.log(TAG, 'cart for user(' + userId + ') is not exist');
            }
        }
    });
};

ShoppingCartCtrl.productQtyIncrement = function(userId, sku, callback){
    getCartByUser(userId, function(err, cart){
        if(err){
            console.log(TAG, 'getCart: ' + err);
            callback(false);
        }else{
            if(cart){
                var matchIndex = findItemBySKU(cart.items, sku);
                if(matchIndex < 0){
                    callback(false);
                }else{
                    var currQty = Number(cart.items[matchIndex].qty);
                    if(currQty >= MAX_QTY){
                        callback(false);
                        console.log(TAG, 'item(' + sku + ') in cart for user(' + userId + ') reach max qty');
                    }else{
                        cart.items[matchIndex].set('qty', currQty + 1);
                        cart.markModified('items');
                        cart.save(function(){
                            callback(true);
                        });
                    }
                }
            }else{
                callback(false);
                console.log(TAG, 'cart for user(' + userId + ') is not exist');
            }
        }
    });
};

ShoppingCartCtrl.productQtyDecrement = function(userId, sku, callback){
    getCartByUser(userId, function(err, cart){
        if(err){
            console.log(TAG, 'getCart: ' + err);
            callback(false);
        }else{
            if(cart){
                var matchIndex = findItemBySKU(cart.items, sku);
                if(matchIndex < 0){
                    callback(false);
                }else{
                    var currQty = Number(cart.items[matchIndex].qty);
                    currQty = currQty - 1;
                    if(currQty > 0){
                        cart.items[matchIndex].set('qty', currQty);
                    }else{
                        cart.items.splice(matchIndex, 1);
                    }
                    cart.markModified('items');
                    cart.save(function(){
                        callback(true);
                    });
                }
            }else{
                callback(false);
                console.log(TAG, 'cart for user(' + userId + ') is not exist');
            }
        }
    });
};