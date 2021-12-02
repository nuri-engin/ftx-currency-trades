// Call the constants/configs
const { ACTION_TYPES } = require('../constants');

function determineBidsOrAsks(action) {
    return (
        action === ACTION_TYPES.buy ? 
        'asks' : 
        action === ACTION_TYPES.sell ? 
        'bids' : 
        ''
    );
}

module.exports = determineBidsOrAsks;