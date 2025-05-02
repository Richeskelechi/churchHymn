const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);

// Create Hymn Validation
const validateCreateHymn = (data) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(100).required(),
    description: Joi.string().trim().min(5).required(),
    status: Joi.string().valid('free', 'premium').optional()
  });

  return schema.validate(data);
};

// Update Hymn Validation
const validateUpdateHymn = (data) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(100).optional(),
    description: Joi.string().trim().min(5).optional(),
  })

  return schema.validate(data);
};

// Hymn ID Validation
const validateHymnId = (id) => {
    const schema = Joi.object({
      id: JoiObjectId().required()
    });
  
    return schema.validate({ id });
  };

module.exports = {
  validateCreateHymn,
  validateUpdateHymn,
  validateHymnId
};
