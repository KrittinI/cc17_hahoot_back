import Joi from "joi";

const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
})


const validateLogin = input => {
    const { error } = loginSchema.validate(input, { abortEarly: false });
    if (error) {
        const result = error.details.reduce((acc, c) => {
            acc[c.path[0]] = c.message
            return acc
        }, {})
        // console.dir(error);
        return result
    }
}

export default validateLogin;