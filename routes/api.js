/**
 * Created by longNightKing on 1/16/16.
 */
var router = require('express').Router();
var TAG = 'API';
var UserUtil = require('../user_helper/user_util');
/* GET signup new user. */
router.post('/signup', function(req, res, next) {
    var userData = req.body;
    console.log(userData);
    if(userData.email && userData.password){



        UserUtil.signUp(userData, function(){
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                isSuccess: true,
                message: 'Signup successfully',
                token: '12345678'
            }));
        })
    }else{
        next();
    }
});

module.exports = router;