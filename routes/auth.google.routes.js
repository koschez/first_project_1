module.exports = function(app, passport) {

    app.get('/profile', isLoggedIn, function(req, res){
        res.json(req.user);
    });

    app.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}));

    app.get('/login/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/session_id',
            failureRedirect: '/login' }));

    app.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/login/google/callback',
        passport.authenticate('google', { successRedirect: '/session_id',
            failureRedirect: '/login' } ));

};
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}