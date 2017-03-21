var bcrypt = require('bcrypt-nodejs');

// AUTHENTICATION

// helper for hashing password before storing in db
exports.hashPassword = function (password, callback) {
  bcrypt.hash(password, null, null, callback);
};

// helper to check entered plaintext password against hash in db
exports.checkPassword = function (enteredPassword, hash, callback) {
  bcrypt.compare(enteredPassword, hash, callback);
};
