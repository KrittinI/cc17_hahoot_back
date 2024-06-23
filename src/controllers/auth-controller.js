<<<<<<< Updated upstream
const authController = {}

authController.login = (req, res, next) => {
    console.log("login");
}
authController.register = (req, res, next) => {
    console.log("register");
=======
const authService = require("../services/auth-service");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-services");
const verifyService = require("../services/verify-service");
const createError = require("../utils/create-error");
const uuid = require('uuid').v4
const transporter = require('../utils/nodemailer')

const authController = {}

authController.register = async (req, res, next) => {
    try {
        const data = req.body

        if (data.password !== data.confirmPassword) {
            createError(400, "password and confirmpassword is not match")
        }

        // const existEmail = authService.findUserByEmail(data.email)
        // if (existEmail) {
        //     createError(400, "email already existed")
        // }

        data.password = await hashService.hash(data.password)
        delete data.confirmPassword

        const id = uuid()
        const tempData = JSON.stringify(data)
        const result = verifyService.createVerfiId(id, tempData)
        const mailOptions = {
            from: process.env.NODE_MAILER_USER,                // sender
            to: data.email,                // list of receivers
            subject: 'Hello from sender',              // Mail subject
            html: `<b>Please do not reply this mail</b>\n\n <a href="http://localhost:8008/auth/verify?verifyId=${id}">Verify</a>`,   // HTML body
        };
        // transporter.sendMail(mailOptions, function (err, info) {
        //     if (err)
        //         console.log(err)
        //     else
        //         console.log(info);
        // });

        res.json(result)

    } catch (error) {
        next(error)
    }
>>>>>>> Stashed changes
}

authController.verify = async (req, res, next) => {
    try {
        const key = req.query.verifyId

        const existedKey = await verifyService.findDataById(key)
        if (!existedKey) {
            createError(400, "Not foud user")
        }

        const data = JSON.parse(existedKey)
        authService.createUser(data)

        res.json(data)
        // resstatus(200).redirect('https://localhost:5173')
        // res.redirect('https://google.co.th')
    } catch (error) {
        next(error)
    }
}

authController.login = async (req, res, next) => {
    try {
        const data = req.body

        const existUser = await authService.findUserByEmail(data.email)
        if (!existUser) {
            createError(400, "Email or password is incorrect")
        }

        const isMathch = await hashService.compare(data.password, existUser.password)
        if (!isMathch) {
            createError(400, "Email or password is incorrect")
        }

        const accessToken = jwtService.sign({ id: existUser.id })
        res.status(200).json({ accessToken })
    } catch (error) {
        next(error)
    }
}

authController.getMe = (req, res, next) => {
<<<<<<< Updated upstream
    console.log("getme");
=======
    res.status(200).json({ user: req.user })
>>>>>>> Stashed changes
}


module.exports = authController