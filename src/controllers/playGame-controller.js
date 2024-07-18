const transporter = require("../utils/nodemailer");
const sanitizeHtml = require("sanitize-html");
const sharp = require("sharp");
const fs = require("fs");
const uploadService = require("../services/upload-service");

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
      subject: "Your result in event game from Hahoot", // Mail subject
      html: `<b>Please do not reply this mail</b>\n\n ${text}`, // HTML body
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  } catch (error) {
    next(error);
  }
};

playGameController.multiplayerSendMail = async (req, res, next) => {
  const result = req.body;
  const image = result.scoreImage;
  const imageBase64 = new Buffer.from(image.split("base64,")[1], "base64");

  try {
    const mailOptions = {
      from: process.env.NODE_MAILER_USER, // sender
      to: result.email, // list of receivers
      // to: result.email, // list of receivers
      subject: "Result of event game from Hahoot", // Mail subject
      html: `<div>
       <h3>Please do not reply to this mail</h3>
  <h3>Hello, this is your result</h3>
      </div>`, // HTML body
      attachments: [
        {
          filename: "score.jpg",
          contentType: "image/jpeg",
          content: imageBase64,
        },
      ],
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  } catch (error) {
    next(error);
  }
};

playGameController.clientPlayerSendMail = async (req, res, next) => {
  const result = req.body;

  const listPlayer = result.data
    .sort((a, b) => b.score - a.score)
    .map(
      (p, index) =>
        `<tr style="border-bottom: 1px solid #83878d;"}>
      <td> ${index + 1} </td>
      <td>${p.name}</td>
      <td>${p.score}</td>
    </tr>`
    )
    .join("");

  const showScore = `
    <h3>Please do not reply to this mail</h3>
    <h3>Hello, this is your result</h3>
    <div style="position: relative">
        <div style="position: absolute;display: grid; gap: 0.5rem; border-radius: 0.5rem; padding: 2rem; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); border: 2px solid DodgerBlue; background: linear-gradient(180deg, rgba(173, 194, 255, 1) 0%, rgba(231, 237, 255, 1) 100%);margin-left:35%;width:30%;text-align:center">
          <h1 style="font-weight: bold;">Scoreboard</h1>
          <table style="border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid #83878d;">
                <th>Ranking</th>
                <th>Username</th>
                <th>Score</th>
                </tr>
                ${listPlayer}
            </thead>
            <tbody>
            </tbody>
            </table>
            </div>
            </div>
            `;

  try {
    const mailOptions = {
      from: process.env.NODE_MAILER_USER, // sender
      to: result.email, // list of receivers
      subject: "Result of event game from Hahoot", // Mail subject
      html: showScore, // HTML body
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
