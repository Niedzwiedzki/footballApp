const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys')
sgMail.setApiKey(keys.sendGridApiKey)

const sendInvitationEmail = (email, group, id) => {
    sgMail.send({
        to: email,
        from: 'kuban@op.pl',
        subject: group,
        text: `Zapraszam do uczestnictwa w typowaniu wyników http://localhost:3000/invitation?group=${id}` 
    })
}

const sendGoodbyeEmail = (email, group) => {
    sgMail.send({
        to: email,
        from: 'kuban@op.pl',
        subject: `Zostałeś usunięty z grupy ${group}`,
        text: `Nie jesteś już członkiem grupy` 
    })
}


module.exports = {
    sendInvitationEmail,
    sendGoodbyeEmail
}