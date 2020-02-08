require('custom-env').env();

module.exports = {
  serviceAccountJson: process.env.SERVICE_ACCOUNT_KEY,
  projectId: process.env.PROJECT_ID,
  clientName: 'node-client'
};
