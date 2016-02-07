'use strict'

module.exports = {
  vendor: 'mc',
  id: 'github',
  name: 'GitHub',
  description: 'Extension for working with GitHub, including cloning repos, handling webhooks, and the status API.',
  webhooks: [
    require('./src/webhooks/execute-pipeline')
  ],
  pipeline_settings: [
    require('./src/pipeline-settings/webhook-settings')
  ],
  stages: [
    require('./src/stages/clone-repo')
  ],
  logs: [],
  accounts: [
    require('./src/accounts/github-oauth')
  ]
}
