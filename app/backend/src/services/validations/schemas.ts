import * as Joi from 'joi';

const checkLogin = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
});

const insertValidation = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().invalid(Joi.ref('homeTeam')).required(),
  awayTeamGoals: Joi.number().required(),
  homeTeamGoals: Joi.number().required(),
}).messages({ 'any.invalid': 'It is not possible to create a match with two equal teams' });

export default checkLogin;
export { insertValidation };
