const storage = require('./storage.js');

/**
* Fetches token from storage
* @param {String} teamId the id of the team as passed by Slack
* @param {Function} callback Callback returns error and token, null token means no team provided
*/
module.exports = function getWorkspaceUserId(teamId, callback) {

  if (!teamId) {
    return callback(null, 'NO TEAM BRUHSKY');
  }

  // Fetch the team details from StdLib Storage
  storage.getTeam(teamId, (err, team) => {

    if (err) {
      return callback(err);
    }

    let workspaceUserId = team;

    if (!workspaceUserId) {
      return callback(new Error('No Workspace User ID Specified'));
    }

    return callback(null, workspaceUserId);

  });

}
