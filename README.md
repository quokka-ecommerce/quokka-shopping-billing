# quokka billing & shopping service
It is a web backend service wrote in nodejs and Express framework. This service including shopping cart, checkout and order management functionality. <br />
Currently, the shopping cart REST APIs are initially completed. <br />
    * GET shopping items in the shopping cart, http://localhost:3100/api/shoppingcart/:userId <br />
    * POST all the items from local shopping cart to backend, http://localhost:3100/api/shoppingcart/postcart, body = {userId:"", items:[]} <br />
    * (POST) Add one product into shopping cart, http://localhost:3100/api/shoppingcart/add, body = {userId:"", item:{qty:"", sku:""}} <br />
    * (DELETE) Clear shopping cart, http://localhost:3100/api/shoppingcart/clear/:userId <br />
    * (DELETE) Remove one product from shopping cart, http://localhost:3100/api/shoppingcart/remove/:userId/:sku <br />
    * (POST) Increase quantity by 1, http://localhost:3100/api/shoppingcart/increment, body = {userId:"", sku:""} <br />
    * (POST) Decrease quantity by 1, http://localhost:3100/api/shoppingcart/decrement, body = {userId:"", sku:""} <br />
