const transporter = require("../utils/nodemailer");

const playGameController = {};
playGameController.sendMail = async (req, res, next) => {
  const text = req.body.map(
    (question) =>
      `<ul style=";color:black">
        <strong>Question : </strong> ${
          JSON.stringify(question?.question).split('"')[1]
        }
       <li><strong>Your answer : </strong>${
         JSON.stringify(question?.yourAnswer).split('"')[1]
       }</li>
       <li><strong>Result : </strong>${JSON.stringify(question?.result)}</li>
       <li><strong>Score : </strong>${JSON.stringify(question?.score)}</li>
       <li><strong>Sum : </strong>${JSON.stringify(question?.sum)}</li>
       </ul>
       `
  );

  try {
    const mailOptions = {
      from: process.env.NODE_MAILER_USER, // sender
      to: req.user.email, // list of receivers
      subject: "Hello from sender", // Mail subject
      html: `<b>Please do not reply this mail</b>\n\n <a href="http://localhost:8008/auth/verify?verifyId=${req.user.id}">${text}</a>`, // HTML body
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  } catch (error) {
    next(error);
  }
};

module.exports = playGameController;
