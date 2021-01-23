// helpers.js

exports.isEmptyString = (value) => {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}