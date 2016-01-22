var mongoose = require('mongoose');
var hash = require ('../modules/pass.hash.js')
var local_pass_parameter = 'aAbB'
var passport = require('passport');
var user = require('../schemas/user.schema.js')
var senmail = require ('../modules/mail.send.js')

/* GET home page. */
module.exports = function(app, sess) {

  app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.post('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.post('/reg_page', function (req, res){
    res.render('reg_page', { title: 'registration' });
  });

  app.get('/reg_page', function (req, res){
    res.render('reg_page', { title: 'registration' });
  });

  app.post('/send_mail', function(req, res){
    senmail.sendMail(req.body.email, function(err, info){
      res.json('sent');
    })
  });

  app.post('/register', function (req, res){

    var email = req.body.email;
    var pass = req.body.pass + local_pass_parameter;
    var nick = req.body.nick;

    user.find({email: email}, function(err, user){
      if (user[0]) {
        console.log('REGISTER FAILED [email]: ' + email)
        res.send('User with this email already exists. Try again!');
        return;
      } else {
        register();
      }
    });

    var hashed_pass = hash.hash(pass, function (err, hashed) {
      hashed_pass = hashed
    });

    function register () {

      if (pass.length < 6) {
        console.log('REGISTER FAILED [pass.length]: ' + pass.length)
        res.send('Password is too short. Try again!');
        return;
      }
      newUser = {
        email: email,
        pass: hashed_pass,
        nick: nick
      };

      new user(newUser).save(function (err, data) {
        console.log('[REGISTERED user] with email: ' + (email) + ' ,pass: ' + (hashed_pass) + ' ,nick: ' + nick)
        res.json(data)
      });

    }
  });

  app.get('/logout', function(req, res){
    req.session.destroy(function(err) {})
    res.redirect('/')
    console.log('[DESTROYED session] with VSID: (' + (sess._id) + ')' + ' with SID: (' + (req.sessionID) +')')
  })

  app.post('/login', function (req, res){

    var email = req.body.email;
    var pass = req.body.pass + local_pass_parameter;

    var hashed_pass = hash.hash(pass, function (err, hashed) {
      hashed_pass = hashed
    });

    user.find({email: email}, function(err, user){
      if (user[0]) {
        hash.compare(pass, user[0].pass, function (err, result) {
          if (result == true) {
            sess = req.session;
            sess._id = user[0]._id;
            sess.userEmail = user[0].email;
            remember_me();
            res.json(user[0]);
          } else if (result == false) {
            console.log('LOGIN FAILED BY [pass]: ' + pass)
            res.send('Pass is incorrect!');
          }
        });

      } else {
        console.log('LOGIN FAILED BY [email]: ' + email)// + ' [pass]: ' + pass)
        res.send('User with this email not exists!');
        return;
      }
    });

    function remember_me(){
      if (req.body.remember == 'on'){
        console.log(('[LOGIN SUCCESS] with VSID: (' + (sess._id) + ')' + ' with SID: (' + (req.sessionID) +'),' + '[REMEMBER ME] function is ON'))
      } else {
        console.log('[LOGIN SUCCESS] with VSID: (' + (sess._id) + ')' + ' with SID: (' + (req.sessionID) +')')
      }
    }

  });

  app.get('/login', function (req, res){
    res.render('login', { title: 'login' });
  });

  app.get('/session_id', function(req, res){
    console.log("here");
    res.json([req.session, req.sessionID]);
  });

};



  //
  //
  //var newOrder = new mongoose.Schema({
  //  email: String,
  //  order: String
  //});
  //var order = mongoose.model('order', newOrder);
  //
  //app.post('/send-order', function(req, res){
  //  newOrder = {
  //    email: currentUserEmail,
  //    order: req.body.orderName
  //  };
  //  new order(newOrder).save(function (err, data) {
  //    res.json(data)
  //  });
  //});
  //
  //app.get('/send-order', function(req, res){
  //  if (!user.orders[0]){
  //    res.send("заказов нет");
  //    return;
  //  }
  //  res.json(user.orders);
  //  res.render('./orderPage');
  //});





//module.exports = router;
