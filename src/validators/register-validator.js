import Joi from "joi";

const registerSchema = Joi.object(
    {
        userName: Joi.string().required().trim().messages({ 'string.empty': 'user name is required.' }),
        firstName: Joi.string().required().trim().messages({ 'string.empty': 'first name is required.' }),
        lastName: Joi.string().required().trim().messages({ 'string.empty': 'last name is required.' }),
        email: Joi.string().required().email({ tlds: false }).messages({ 'string.empty': 'last name is required.' }),
        mobile: Joi.string().required().pattern(/^[0-9]{10}$/).messages({ 'string.empty': 'last name is required.' }),
        password: Joi.string().required().pattern(/^[0-9a-zA-Z]{6,}$/).messages({ 'string.empty': 'password is required.', "string.pattern.base": 'password must have at least 6 characters' }),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({ 'string.empty': 'password is required.', 'any.only': 'password and confirm password did not match' })
    }
)

const validateRegister = (input) => {
    const { error } = registerSchema.validate(
        input,
        { abortEarly: false, allowUnknown: true }
    )
    if (error) {
        const result = error.details.reduce((acc, c) => {
            acc[c.path[0]] = c.message
            return acc
        }, {})
        console.dir(error);
        return result
    }
}


export default validateRegister;