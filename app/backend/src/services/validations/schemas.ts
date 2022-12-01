import * as Joi from 'joi';

const checkLogin = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
});

export default checkLogin;
