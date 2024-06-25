const Joi = require("joi");
const createError = require("../utils/create-error");

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).messages({ "string.empty": "Email is not allowed to be empty." }).message({
    "string.email": "Email is not formatted correctly and is not a valid email.",
  }),
  password: Joi.string().required().pattern(new RegExp("^[0-9a-zA-Z]{5,}$")).messages({ "string.empty": "Password is not allowed to be empty." }).message({
    "string.pattern.base": "Password must be at least 5 characters.",
  }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Password and confirm password did not match." })
    .messages({
      "string.empty": "Confirm password is not allowed to be empty.",
    })
    .strip(),
  profileImage: Joi.string()
});

const validateRegister = (input) => {
  const { value, error } = registerSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    createError(400, error.details[0].message);
  }

  return value;
};

module.exports = validateRegister;
