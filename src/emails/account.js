const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail = function (email, name) {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'armant.hitchcock@gmail.com', // Change to your verified sender
        subject: 'Thanks for joining in!',
        text: `${name},welcome to the app`
    })
}

module.exports = {
    sendWelcomeEmail
}