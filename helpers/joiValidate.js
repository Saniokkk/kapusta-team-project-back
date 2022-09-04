const createError = require("./createError");

const joiValidate = (schema, body) => {
    const { error } = schema.validate(body);

    if (error) {
        throw createError(400, error.message);
    }
}

module.exports = joiValidate;