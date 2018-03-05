const request = require('request');

/**
 * Fetches the chat history for a channel
 * @param {string} token 
 * @param {string} channel 
 * @param {object} callback 
 */
module.exports = (token, channel, callback) => {

  request.get(`https://slack.com/api/channels.history?token=${token}&channel=${channel}&count=1000`, (error, response, body) => {

    if (error) {
      return callback(error);
    }

    let history;
    try {
      history = JSON.parse(body);
    } catch (e) {
      history = {}
    }

    if (!body.ok) {
      return callback(new Error(history.error));
    }

    callback(null, history);

  });

};
