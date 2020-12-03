'use-strict';

const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

aws.config.loadFromPath(`${__dirname}/config.json`);
const ses = new aws.SES();
const email = process.env.AWS_EMAIL_SES;

exports.get = (req, res, next) => {
  const params = { EmailAddress: email };
  ses.verifyEmailAddress(params, function (err, data) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};
exports.post = (req, res, next) => {

  if (req.body.email) {
    let ses_mail = `From: 'AWS Tutorial Series' <${email}>\n`;
    ses_mail = `${ses_mail}To: ${email}\n`;
    ses_mail += 'Subject: AWS SES Attachment Example\n';
    ses_mail += 'MIME-Version: 1.0\n';
    ses_mail += 'Content-Type: multipart/mixed boundary="NextPart"\n\n';
    ses_mail += '--NextPart\n';
    ses_mail += 'Content-Type: text/html charset=us-ascii\n\n';
    ses_mail += 'This is the body of the email.\n\n';
    ses_mail += '--NextPart\n';
    ses_mail += 'Content-Type: text/plain\n';
    // ses_mail = ses_mail + "Content-Disposition: attachment filename=\"attachment.txt\"\n\n"
    ses_mail =
      `${ses_mail}AWS Tutorial Series - Really cool file attachment!` + `\n\n`;
    ses_mail += '--NextPart--';

    const params = {
      RawMessage: { Data: new Buffer(ses_mail) },
      Destinations: [req.body.email],
      Source: `'AWS Tutorial Series' <${email}>'`,
    };

    ses.sendRawEmail(params, function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(500).json({ message: 'email não pode ser nulo' });
  }
};
exports.delete = (req, res, next) => {
  const params = {
    EmailAddress: email,
  };

  ses.deleteVerifiedEmailAddress(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};
