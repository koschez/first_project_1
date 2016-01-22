var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var configAuth = require('../config/auth.google');
var person = require('../schemas/person.schema');

module.exports = function(passport, sess) {

    //console.log(passport);
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        person.findById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'email', 'photos', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            process.nextTick(function(){
                person.findOne({'facebook.id': profile.id}, function(err, user){

                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    else {
                        var newUser = new person();
                        newUser.facebook.token = accessToken;
                        newUser.name = {
                            nameToDisplay: profile.name.givenName + ' ' + profile.name.familyName
                        };
                        newUser.email = profile.emails[0].value;
                        newUser.photo = profile.photos[0].value;
                        newUser.role = "User";

                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }

    ));

    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                person.find({'email': { $in: profile.emails[0].value}}, function(err, user){
                    if(err)
                        return done(err);
                    if(user[0])
                        return done(null, user[0]);
                    else {
                        var newUser = new person();
                        newUser.google.token = accessToken;
                        newUser.name = {
                            nameToDisplay: profile.displayName
                        };
                        newUser.email = profile.emails[0].value;
                        newUser.photo = profile._json.image.url;
                        newUser.role = "User";
                        newUser.save(function(err){
                            if(err)
                                throw err;

                            return done(null, newUser);
                        });
                    }
                });
            });
        }

    ));
};