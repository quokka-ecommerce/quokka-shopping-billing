/**
 * Created by longNightKing on 1/16/16.
 */
var UserUtil = exports;
var DbHelper = require('./db_helper/db-helper');
var modelName = 'user';
var TAG = 'user_util';

UserUtil.signUp = function(data, callback){
    DbHelper.addOneDocToCollection(modelName, data, function(err, raw){
        if(err){
            console.log(TAG, "signup failed: " + err);
        }else{
            callback();
        }
    });
}