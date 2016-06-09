/*
 * creates a design doc
 */

'use strict'

const fieldsOfGroup = require('../views/fieldsOfGroup')

module.exports = () => ({
  _id: '_design/fieldsOfGroup',
  views: {
    fieldsOfGroup: {
      map: fieldsOfGroup.toString(),
      reduce: '_count'
    }
  }
})
