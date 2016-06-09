/*
 * creates a design doc
 */

'use strict'

const groups = require('../views/groups')

module.exports = () => ({
  _id: '_design/groups',
  views: {
    groups: {
      map: groups.toString()
    }
  }
})
