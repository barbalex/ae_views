/*
 * creates a design doc
 */

'use strict'

const organizations = require('../views/organizations')

module.exports = () => ({
  _id: '_design/organizations',
  views: {
    organizations: {
      map: organizations.toString()
    }
  }
})
