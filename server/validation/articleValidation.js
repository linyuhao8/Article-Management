const Joi = require("joi");

const articleSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.object().required(),
  categories: Joi.string().required(),
  tags: Joi.alternatives()
    .try(Joi.array().items(Joi.string()), Joi.string())
    .required(),
  status: Joi.string().valid("draft", "published").default("draft"),
  slug: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
  contentText: Joi.string().min(10).required(),
  cleanDescription: Joi.string().optional().allow(""),
});

module.exports = { articleSchema };
