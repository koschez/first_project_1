var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://koschez.gm@gmail.com:12061994aAbB@smtp.gmail.com');

function senMail(email, callback) {
    var mailOptions = {
        from: 'koschez.gm@gmail.com',
        to: email,
        subject: 'lexterri',
        text: '',
        html: '<b>aaaaaaaaaaaaaaaa</b>'
    };

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err)
            callback(err);
            return;
        }
        console.log('Message sent: ' + info.response);
        callback(null, 'sent');
    });
}

module.exports = {
    sendMail: senMail
};