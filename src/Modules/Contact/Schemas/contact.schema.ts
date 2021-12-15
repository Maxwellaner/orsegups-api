import Joi from 'joi';
import ContactEnum from '../../../enums/contactEnum';

const create = Joi.object({
  name: Joi.string().required(),
  contactType: Joi.string().valid('familiar', 'professional', 'friend'),
  email: Joi.string().email().required(),
  phone: Joi.string().length(11).pattern(/^[0-9]+$/)
});

const get = Joi.object({
  id: Joi.number().required()
})

export default { create }
