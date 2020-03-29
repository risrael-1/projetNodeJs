var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Authentification' });
});

// router.post('/authUsers', async function(req, res, next) {
//   const userName = req.body.userName
//   const password = req.body.password
//   res.render('users', {
//     userName: userName,
//     password: password
//   });
// });

module.exports = router;
