const Joi = require("joi");
const createError = require("../utils/create-error");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .messages({ "string.empty": "Email is not allowed to be empty." })
    .message({
      "string.email": "Email is not formatted correctly.",
    }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "Password is not allowed to be empty." }),
});

const validateLogin = (input) => {
  const { value, error } = loginSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    createError({
      message: error.details[0].message,
      statusCode: 400,
    });
  }

  return value;
};

module.exports = validateLogin;
