// Function to send emails
import AllRecipients from  "../controllers/getAllRecipients.js"
import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
import {config}from 'dotenv';
import call from "./phoneService.js";
config();
// OAuth2 client setup
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmailNotification() {
  try {
    const recipients = await AllRecipients();
    console.log(recipients);
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailPromises = recipients.map((recipient) => {
      const mailOptions = {
        from: 'Hunger🔗Chain <' + process.env.GMAIL_USER + '>',
        to: recipient.email,
        subject: 'Hello from Hunger🔗Chain',
        text: 'Thank you for connecting with Hunger🔗Chain!',
        html: '<h1>Thank you for connecting with Hunger🔗Chain!</h1>',
      };

      return transport.sendMail(mailOptions);
    });

    const results = await Promise.all(mailPromises);
    await call();
    return results;
  } catch (error) {
    console.error('Error sending emails:', error.message);
    throw error;
  }
}

export default sendEmailNotification;