'use strict'


module.exports = {
  id: 'webhook',
  name: 'Webhook Settings',
  settings: {
    enabled: {
      default: 0,
      name: "Enable Github",
      type: 'checkbox'
    },
    push: {
      default: 1,
      name: 'Push',
      type: 'checkbox',
    },
    pull_request_opened: {
      default: 1,
      name: 'Pull Request - Opened',
      type: 'checkbox',
    },
    pull_request_synchronize: {
      default: 1,
      name: 'Pull Request - Code Pushed',
      type: 'checkbox',
    },
    pull_request_closed_merged: {
      default: 1,
      name: 'Pull Request - Merged',
      type: 'checkbox',
    },
    release_published: {
      default: 0,
      name: 'Release (tag) Created',
      type: 'checkbox',
    },

  },
  
}