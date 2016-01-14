'use strict'

module.exports = {

  id: 'clone_repo',
  name: 'Clone GitHub Repository',
  description: 'Clones a GitHub repository',
  icon: '',

  options: {
    account: {
      name: 'GitHub Account',
      type: 'account',
      account_type: 'github',
      required: true
    },
    length: {
      name: 'Org',
      description: '',
      required: true
    }
  },

  execute: function(stage) {

    // TODO: implement

  }

}
