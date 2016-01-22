var bcrypt = require('bcrypt-nodejs');

var PasswordHash = {
    hash: hash,
    compare: compare
};

function hash(pass, callback) {
    bcrypt.hash(pass, null, null, function(err, hash){
        if (err) callback(err);
        pass = hash;
        callback(null, pass);
    });
};

function compare(pass, hash, callback) {
        bcrypt.compare(pass, hash, function(err, result) {
            if (err) callback(err)
            if (result == true){
                callback(null, true);
            }
            else {
                callback(null, false);
            }
            //console.log('compared: ' + pass + ' and: ' + hash + ' result: ' + result)
    });
};

module.exports = PasswordHash;