// App basics
const express = require('express');
const router = express.Router();

// Call the constants/configs
const { PATHS, STATUS_CODES } = require('../constants');

router.get(PATHS.BASE, handleBaseRequest);

module.exports = router;

function handleBaseRequest(req, res, next) {
    res.status(200).send({
        status: STATUS_CODES.success,
        message: "Welcome to the FTX Currency Trade API"
    });
}