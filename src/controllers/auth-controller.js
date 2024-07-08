const authService = require("../services/auth-service");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-services");
const verifyService = require("../services/verify-service");
const createError = require("../utils/create-error");
const transporter = require("../utils/nodemailer");
const validateLogin = require("../validators/login-validator");
const validateRegister = require("../validators/register-validator");

const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.body;
    validateRegister(data);

    const existEmail = await authService.findUserByEmail(data.email);
    if (existEmail) {
      createError(400, "email already existed");
    }
    if (data.password) {
      data.password = await hashService.hash(data.password);
    }
    if (data.googlePassword) {
      data.googlePassword = await hashService.hash(data.googlePassword);
    }
    // ------------------------- for not  using email verify ------------------------
    const result = await authService.createUser(data);

    // ------------------------- for using email verify ------------------------
    // const tempData = JSON.stringify(data)
    // const result = await verifyService.createVerfiId(tempData)
    // const mailOptions = {
    //     from: process.env.NODE_MAILER_USER,                // sender
    //     to: data.email,                // list of receivers
    //     subject: 'Hello from sender',              // Mail subject
    //     html: `<b>Please do not reply this mail</b>\n\n <a href="http://localhost:8008/auth/verify?verifyId=${result.id}">Verify</a>`,   // HTML body
    // };
    // transporter.sendMail(mailOptions, function (err, info) {
    //     if (err)
    //         console.log(err)
    //     else
    //         console.log(info);
    // });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

authController.verify = async (req, res, next) => {
  try {
    const key = req.query.verifyId;

    const existedKey = await verifyService.findDataById(key);
    if (!existedKey) {
      createError(400, "Not foud user");
    }
    await verifyService.deleteDataById(existedKey.id);
    const data = JSON.parse(existedKey.data);

    await authService.createUser(data);

    res.json(data);
    // resstatus(200).redirect('https://localhost:5173')
    // res.redirect('https://google.co.th')
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    const data = req.body;
    validateLogin(data);
    console.log(data);
    const existUser = await authService.findUserByEmail(data.email);
    if (!existUser) {
      createError(400, "Email or password is incorrect");
    }
    if (data.password) {
      const isMathch = await hashService.compare(data.password, existUser.password);
      if (!isMathch) {
        createError(400, "Email or password is incorrect");
      }
    }

    if (data.googlePassword) {
      const isMathch = await hashService.compare(data.googlePassword, existUser.googlePassword);
      if (!isMathch) {
        createError(400, "Email or password is incorrect");
      }
    }

    const accessToken = jwtService.sign({ id: existUser.id });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports = authController;
