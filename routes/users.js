var express = require('express');
var router = express.Router();
var crypto = require('crypto');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//회원가입
router.post('/signup', function(req, res, next) {
  var id = req.body.id;
  var password = req.body.password;
  var nickname = req.body.nickname;

  var db = req.app.get('database');

  if (db == undefined) {
    res.json({message:'503 Server Error'});
    return;
  }

  var validate = userValidation(id, password,nickname);
  if (validate == false) {
    res.json({message:'400 Bad Request'});
  }

  var usersCollection = db.collection('users');

  usersCollection.count({'id':id}, function(err, result) {
    if (err) throw(err);

    if (result > 0) {
      res.json({message: '400 Bad Request'});
      return;
    } else {
      var cryptoPassword = crypto.createHash('sha512').update(password).digest("base64");

         usersCollection.insertOne({'id': id, 
         'password': cryptoPassword, 'nickname': nickname}, function(err, result) {
           if (err) throw(err);
           if (result.ops.length > 0)
             res.json(result.ops[0]); 
           else
             res.json({message:'503 Server Error'});
      });
    }
  });
});

var userValidation = function(id, password,nickname) {
  if (id == '' || password == '' || nickname == '') {
    return false;
  }
  if (id.length < 6 || id.length > 12) {
    return false;
  }
  if (password.length < 8 || password.length > 20) {
    return false;
  }
  if (nickname.length < 4 || nickname.length > 20)
  return true;
}

//로그인
router.post('/signin', function(req, res, next) {

});

module.exports = router;