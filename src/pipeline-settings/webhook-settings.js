'use strict'


module.exports = {
  id: 'webhook',
  name: 'Webhook Settings',
  options: {
    enabled: {
      default: 0,
      name: "Enable Github",
      type: 'checkbox'
    },
    pull_request_opened: {
      default: 1,
      name: 'Pull Request Opened',
      type: 'checkbox',
    },
    pull_request_closed: {
      default: 1,
      name: 'Pull Request Merged',
      type: 'checkbox',
    },
    release_published: {
      default: 0,
      name: 'Release Created',
      type: 'checkbox',
    },


  },
  
}