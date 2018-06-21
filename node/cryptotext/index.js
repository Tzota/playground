var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '11111111111111111111111111111111',
    ivector = '1111111111111111';

function encrypt(text){
  var cipher = crypto.createCipheriv(algorithm, new Buffer(password), new Buffer(ivector));
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipheriv(algorithm, new Buffer(password), new Buffer(ivector))
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

var hw = encrypt("hello world")
// outputs hello world
console.log(hw);
console.log(decrypt(hw));
