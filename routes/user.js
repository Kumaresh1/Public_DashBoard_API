  
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require("../models/user");

const signToken = userID => {
  return JWT.sign({
      iss: "NoobCoder",
      sub: userID
  }, "NoobCoder", {expiresIn: "1h"});
}

router.post('/signup', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username}, (err, user) => {
      if(err) {
          res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
      }
      if(user) {
          res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}})
      }
      else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,              
            email: req.body.email,
            password: req.body.password,
            Designation: req.body.Designation,
            Department: req.body.Department,
            Employee_code: req.body.Employee_code,
            Office_Address:req.body.Office_Address,
            City:req.body.City,
            State:req.body.State,
            Pincode:req.body.Pincode
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: "User created"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        }
      });
    })

      

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  if(req.isAuthenticated()) {
      const {_id, username} = req.user;
      const token = signToken(_id);
      res.cookie('access_token', token, {httpOnly: true, sameSite: true});
      res.status(200).json({isAuthenticated: true, user: {username}})
  }
});
/*
router.post("/login", function (req, res, next) {
  // call passport authentication passing the "local" strategy name and a callback function
  passport.authenticate('local', function (error, user, info) {
    // this will execute in any case, even if a passport strategy will find an error
    // log everything to console
    console.log(error);
    console.log(user);
    console.log(info);

    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      next();
    }

    res.status(401).send(info);
  })(req, res);
}, (req, res, next) => {
 
  const _id = req.body._id
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = signToken(_id);
          res.cookie('access_token', token, {httpOnly: true, sameSite: true});
          /*const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "60 days"
            }
          )
          
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
      }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
*/
router.get('/logout', passport.authenticate('jwt', {session:false}), (req, res) => {
  res.clearCookie('access_token');
  res.json({user: {username: ''}, success: true});
});


router.delete("/:userId", (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;