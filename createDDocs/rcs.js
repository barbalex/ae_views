/*
 * creates a design doc
 */

'use strict'

const rcs = require('../views/rcs')

module.exports = () => ({
  _id: '_design/rcs',
  views: {
    rcs: {
      map: rcs.toString(),
      reduce: '_count'
    }
  }
})
