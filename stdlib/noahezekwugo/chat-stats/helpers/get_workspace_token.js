const storage = require('./storage.js');

/**
* Fetches token from storage
* @param {String} teamId the id of the team as passed by Slack
* @param {Function} callback Callback returns error and token, null token means no team provided
*/
module.exports = function getWorkspaceToken(teamId, callback) {

  if (!teamId) {
    return callback(null, null);
  }

  // Fetch the team details from StdLib Storage
  storage.getTeam(teamId, (err, team) => {

    if (err) {
      return callback(err);
    }

    let workspaceToken = team.access_token;

    if (!workspaceToken) {
      return callback(new Error('No Workspace Token Specified'));
    }

    return callback(null, workspaceToken);

  });

}
