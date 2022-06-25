const {ExceptionCode} = require('./httpMessages');

function coderError(message, code) {
    let e = new Error(message);
    e.exceptionCode = ExceptionCode.get(message).value;
    if (code) {
        e.statusCode = code;
    }
    return e;
};

module.exports = coderError;