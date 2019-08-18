const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys')
sgMail.setApiKey(keys.sendGridApiKey)
const env = process.env.NODE_ENV || 'development'

let url;
if(env === 'development') {
    url = 'https://limitless-sea-26734.herokuapp.com'
  } else{
    url = 'http://localhost:3000'
  }


const sendInvitationEmail = (email, group, id) => {
    sgMail.send({
        to: email,
        from: 'kuban@op.pl',
        subject: group,
        text: `Zapraszam do uczestnictwa w typowaniu wyników ${url}/invitation?group=${id}` 
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