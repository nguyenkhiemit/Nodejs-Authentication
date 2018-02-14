var express = require('express');
var User = require('../models/user');
var config = require('../config/database');
var jwt = require('jwt-simple');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST sign up */
router.post('/signup', function (req, res) {
   if(!req.body.email || !req.body.password) {
     res.json({success: false, msg: 'Please pass name and password'});
   } else {
     var newUser = new User({
         name: req.body.email,
         password: req.body.password
     });
     newUser.save(function (err) {
        if(err) {
          res.json({success: false, msg: 'Username already exits'});
        } else {
          res.json({success: true, msg: 'Successful created user!'});
        }
     });
   }
});

/* POST sign in */
router.post('/authenticate', function (req, res) {
    User.findOne({
        name: req.body.email
    }, function (err, user) {
        if(err) throw err;

        if(!user) {
            return res.status(403).send({success: false, msg: 'Authentication fail. User not found'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if(isMatch && !err) {
                    var token = jwt.encode(user, config.secret);
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    return res.status(403).send({success: false, msg: 'Authentication fail. Wrong password'});
                }
            });
        }
    });
});

/* GET member info */
router.get('/memberinfo', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if(token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function (err, user) {
           if(err) throw err;
           if(!user) {
               return res.status(403).send({success: false, msg: 'Authentication fail. User not found'});
           } else {
               return res.json({success: true, name: user.name});
           }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provider'});
    }
});

getToken = function (headers) {
  if(headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if(parted.length == 2) {
          return parted[1];
      } else {
          return null;
      }
  } else {
      return null;
  }
};

module.exports = router;
