const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const getWorkspaceToken = require('../../helpers/get_workspace_token.js');
const getAppUserId = require('../../helpers/get_workspace_user_id.js');
const message = require('../../utils/message.js');
/**
* Slack Slash Command Handler:
*   This function receives slash commands from Slack and dispatches
*   the appropriate handler. You should use this function as the endpoint
*   for all commands, and place commands in /functions/commands/NAME.js,
*   where NAME is the name of your command.
*
*   You can test individual slash commands from the command line with:
*     $ lib .commands.NAME [username] [channel] [text]
*
*   You should not need to modify this file to get a basic Slack app running.
*
* @returns {object}
*/
module.exports = (context, callback) => {
  let command = context.params;
  if (!command.command) {
    return callback(new Error('No command specified'));
  }
  if (command.command[0] !== '/') {
    return callback(new Error('Commands must start with /'));
  }
  let name = command.command.substr(1);
  getWorkspaceToken(command.team_id, (err, workspaceToken) => {
    if (err) {
      callback(err);
    }
    getWorkspaceUserId(command.team_id, (err, workspaceUserId) => {
      lib[`${context.service.identifier}.commands.${name}`](
        {
          user: command.user_id,
          channel: command.channel_id,
          text: command.text,
          command: command,
          workspaceToken: workspaceToken
        },
        (err, result) => {
          if (err) {
            message(
              workspaceToken,
              command.channel_id,
              {
                text: err.message
              },
              callback
            );
          } else {
            message(
              workspaceToken,
              command.channel_id,
              result,
              callback
            );
          }
        }
      );
    })
  });
};
