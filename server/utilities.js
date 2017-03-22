var bcrypt = require('bcrypt-nodejs');

// AUTHENTICATION

// helper for hashing password before storing in db
exports.hashPassword = function (password, callback) {
  bcrypt.hash(password, null, null, callback);
};

// promise-based hash password
exports.hashPasswordAsync = function(password) {
  return new Promise((fulfill, reject) => {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        return reject(err);
      }
      fulfill(hash);
    });
  });
};

// helper to check entered plaintext password against hash in db
exports.checkPassword = function (enteredPassword, hash, callback) {
  bcrypt.compare(enteredPassword, hash, callback);
};

// promise-based check password
exports.checkPasswordAsync = function(enteredPassword, hash) {
  return new Promise((fulfill, reject) => {
    bcrypt.compare(enteredPassword, hash, (err, result) => {
      if (err) {
        return reject(err);
      }
      fulfill(hash);
    });
  });
};
