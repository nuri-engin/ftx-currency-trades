// Call the constants/configs
const { PATHS, STATUS_CODES } = require('../constants');

module.exports = app => {
    app.get(PATHS.BASE, handleBaseRequest);
};

function handleBaseRequest(req, res, next) {
    res.status(200).send({
        status: STATUS_CODES.success,
        message: "Welcome to the FTX Currency Trade API"
    });
}