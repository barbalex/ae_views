/*
 * creates a design doc
 */

'use strict'

const tcs = require('../views/tcs')

module.exports = () => ({
  _id: '_design/tcs',
  views: {
    tcs: {
      map: tcs.toString(),
      reduce: '_count'
    }
  }
})
