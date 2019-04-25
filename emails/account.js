const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys')
sgMail.setApiKey(keys.sendGridApiKey)

const sendInvitationEmail = (email, group, id) => {
    sgMail.send({
        to: email,
        from: 'kuban@op.pl',
        subject: group,
        text: `Zapraszam do uczestnictwa w typowaniu wyników http://localhost:5000/register/${id}` 
    })
}

module.exports = {
    sendInvitationEmail
}