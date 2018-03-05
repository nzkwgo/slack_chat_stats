const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const getHistory = require('../../utils/get_history.js');

/**
* /hello
*
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} workspaceToken The workspace token for the current team
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, workspaceToken = null, callback) => {
  getHistory(workspaceToken, channel, (err, response) => {
    if (err) {
      return callback(err);
    }
    callback(null, {
      reply_broadcast: true,
      text: response
    });
  })
};
