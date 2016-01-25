# quokka billing & shopping service
It is a web backend service wrote in nodejs and Express framework. This service including shopping cart, checkout and order management functionalities.
Currently, the shopping cart REST APIs are initially completed.
    * GET shopping items in the shopping cart, http://localhost:3100/api/shoppingcart/:userId
    * POST all the items from local shopping cart to backend, http://localhost:3100/api/shoppingcart/postcart, body = {userId:"", items:[]}
    * (POST) Add one product into shopping cart, http://localhost:3100/api/shoppingcart/add, body = {userId:"", item:{qty:"", sku:""}}
    * (DELETE) Clear shopping cart, http://localhost:3100/api/shoppingcart/clear/:userId
    * (DELETE) Remove one product from shopping cart, http://localhost:3100/api/shoppingcart/remove/:userId/:sku
    * (POST) Increase quantity by 1, http://localhost:3100/api/shoppingcart/increment, body = {userId:"", sku:""}
    * (POST) Decrease quantity by 1, http://localhost:3100/api/shoppingcart/decrement, body = {userId:"", sku:""}
