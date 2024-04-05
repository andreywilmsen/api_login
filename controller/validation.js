const Joi = require("@hapi/joi");
const { schema } = require("../model/User");

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(5).max(100),
        confirmPassword: Joi.string().required().min(5).max(100)
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(5).max(100),
    });
    return schema.validate(data);
};

const editValidation = (data) => {
    const schema = Joi.object({
        token: Joi.string().required(),
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(5).max(100),
        oldPassword: Joi.string().required().min(5).max(100),
        newPassword: Joi.string().required().min(5).max(100),
        confirmNewPassword: Joi.string().required().min(5).max(100),

    });
    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation, editValidation };