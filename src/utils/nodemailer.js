const nodemailer = require('nodemailer')

// config สำหรับของ gmail
const transporter = nodemailer.createTransport({
    service: process.env.NODE_MAILER_SERVICE,
    auth: {
        user: process.env.NODE_MAILER_USER, // your email
        pass: process.env.NODE_MAILER_PASSWORD // your email password
    }
});

module.exports = transporter


// let mailOptions = {
//     from: 'sender@gmail.com',                // sender
//     to: 'receiver1@gmail.com,receiver2@gmail.com',                // list of receivers
//     subject: 'Hello from sender',              // Mail subject
//     html: '<b>Please do not reply this mail</b>\n\n <a href="google.co.th">Verify</a>',   // HTML body
//     // text: `https://stackoverflow.com/questions/21934667/how-to-attach-file-to-an-email-with-nodemailer`,
//     attachments: [
//         {   // utf-8 string as an attachment
//             filename: 'text1.txt',
//             content: 'hello world!'
//         },
//         {   // binary buffer as an attachment
//             filename: 'text2.txt',
//             content: new Buffer('hello world!', 'utf-8')
//         },
//         {   // file on disk as an attachment
//             filename: 'text3.txt',
//             path: 'doc.txt' // stream this file
//         },
//         {   // filename and content type is derived from path
//             path: 'doc.txt'
//         },
//         // {   // stream as an attachment
//         //     filename: 'text4.txt',
//         //     content: fs.createReadStream('file.txt')
//         // },
//         {   // define custom content type for the attachment
//             filename: 'text.bin',
//             content: 'hello world!',
//             contentType: 'text/plain'
//         },
//         {   // use URL as an attachment
//             // filename: 'license.txt',
//             url: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE'
//         },
//         {   // encoded string as an attachment
//             filename: 'text1.txt',
//             content: 'aGVsbG8gd29ybGQh',
//             encoding: 'base64'
//         },
//         // {   // data uri as an attachment
//         //     path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
//         // }
//     ]
// };

// transporter.sendMail(mailOptions, function (err, info) {
//     if (err)
//         console.log(err)
//     else
//         console.log(info);
// });
