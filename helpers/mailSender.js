const sgMail = require('@sendgrid/mail')
const { createCustomError } = require('./errorHelpers')
const {
  SERVER_HOST,
  VERIFIED_SENDER_EMAIL,
  SENDGRID_API_KEY,
} = require("../config");


const sendMail = async ({to, from, subject, text, html}) => {
sgMail.setApiKey(SENDGRID_API_KEY)

const msg =  {to, from, subject, text, html}

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    throw createCustomError(400, error.message);
  });
};

const sendVerificationMail = async ({email, verificationToken, isRepeat = false}) =>{
  sendMail({
    to: email,
    from: VERIFIED_SENDER_EMAIL,
    subject: `Email verification required${isRepeat ? ' (repeat)' : ''}`,
    text: `Thanks for signing up to My Contacts Database. Before we can continue, we need to validate your email address ${email}. For this To do this, follow the link: ${SERVER_HOST}/api/users/verify/${verificationToken}`,
    html: `<h3>Thanks for signing up to My Contacts Database.</h3> 
            <p>Before we can continue, we need to validate your email address ${email}.</p>
            <a href='${SERVER_HOST}/api/users/verify/${verificationToken}'>ACTIVATE ACCOUNT</a>`,
  });
}

  module.exports = {sendMail, sendVerificationMail};