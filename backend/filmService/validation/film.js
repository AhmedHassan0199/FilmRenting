const joi = require("joi");

const errorMapped = (errors, res) => {
  const errorsMapped = errors.map((e) => ({ message: e.message }));
  return res.status(400).json({ errors: errorsMapped });
};
exports.validateCreateFilm = (req, res, next) => {
  const schema = joi
    .object({
      filmTitle: joi.string().required(),
      price: joi.number().required(),
      genre: joi.string().required(),
      initialRelease: joi.date().required(),
    })
    .options({ abortEarly: false });

  const result = schema.validate(req.body);
  if (result.error) {
    errorMapped(result.error.details, res);
  } else {
    next();
  }
};
