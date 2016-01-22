module.exports = function(app, passport) {
    //console.log(passport);

    app.get('/profile', isLoggedIn, function(req, res){
        //res.render('profile.ejs', { user: req.user });
        res.json(req.user);
    });

    app.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}));

    app.get('/login/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/',
            failureRedirect: '/' }));

    app.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/login/google/callback',
        passport.authenticate('google', { successRedirect: '/',
            failureRedirect: '/' }));

};
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}