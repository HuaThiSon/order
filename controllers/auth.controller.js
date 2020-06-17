const db = require('../db')

module.exports.login = function(req , res){
    res.render('auth/login');
};

module.exports.postLogin = function(req , res){
    var userName = req.body.name;   
    var user = db.get('users').find({ name : userName}).value();

    res.cookie('userId', user.id, {
        signed : true
    });
    res.redirect('/users');

}

module.exports.signOut = function(req , res){
    var user = db.get('users').find({
        id: req.signedCookies.userId
    }).value();
    res.clearCookie('userId');
    res.redirect('login');
}
