const Joi = require("joi");

const regDate = /^\d+$/;
const regDay = /(20[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;


const validateDay = Joi.object.keys({
    date: Joi.string.pattern(regDay).length(10).required()
}).required();

const validateType = Joi.object.keys({
    type: Joi.string.valid('income', 'expense').required()
}).required();


const validateMonthAndYear = Joi.object.keys({
    month: Joi.string.pattern(regDate).maxLength(2).required(),
    year: Joi.string.pattern(regDate).maxLength(4).required()
}).required()

module.exports = {
    validateDay,
    validateType,
    validateMonthAndYear
}
