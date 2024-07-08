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
    .messages({ "string.empty": "Password is not allowed to be empty." }),
  googlePassword: Joi.string()
});

const validateLogin = (input) => {
  const { value, error } = loginSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    createError(400, error.details[0].message);
  }

  return value;
};

module.exports = validateLogin;
