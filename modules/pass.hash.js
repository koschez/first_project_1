var bcrypt = require('bcrypt-nodejs');

var PasswordHash = {
    hash: hash
};

function hash(pass, callback) {
    bcrypt.hash(pass, null, null, function(err, hash){
        if (err) callback(err);
        pass = hash;
        callback(null, pass);
    });
}


module.exports = PasswordHash;