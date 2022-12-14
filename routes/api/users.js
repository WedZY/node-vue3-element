const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const keys = require('../../config/keys');
const passport = require('passport');

// $route Post api/users/register
// @desc 返回的请求json数据
// @access public

// 注册
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(201).json('邮箱已被注册');
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity,
      });
      // 密码加密
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => {
              console.log(err);
            });
        });
      });
    }
  });
});

// $route Post api/users/login
// @desc  返回 token jwt passport
// @access public
// 登录
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(301).json('用户不存在');
    }
    // 密码匹配
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity,
        };
        jwt.sign(rule, keys.secretorKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        });
      } else {
        return res.status(404).json('密码错误');
      }
    });
    //
  });
});

// $route Get api/users/current
// @desc  return current user
// @access Private

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity,
    });
  }
);

module.exports = router;
