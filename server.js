const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
// 引入数据库
const db = require('./config/keys').mongoURL;
// 引入users.js
const users = require('./routes/api/users.js');
const profiles = require('./routes/api/profiles');
//引入body-Parser
const bodyParser = require('body-parser');
// 使用body-Paeser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//使用routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 5000;
mongoose
  .connect(db)
  .then(() => console.log('连接成功'))
  .catch((err) => console.log(err));
// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
