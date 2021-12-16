import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  contactType: Joi.string().valid('familiar', 'professional', 'friend').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(11).pattern(/^[0-9]+$/).required()
});

const put = Joi.object({
  name: Joi.string(),
  contactType: Joi.string().valid('familiar', 'professional', 'friend'),
  email: Joi.string().email(),
  phone: Joi.string().length(11).pattern(/^[0-9]+$/)
})

export default { create, put }
