// Here we aim to provide seperation for app logic.
// Those logics below would be changed during development process 
// Thus, we can easily can change them as well...
module.exports = {
    PATHS: require('./paths'), 
    STATUS_CODES: require('./statusCodes')
};