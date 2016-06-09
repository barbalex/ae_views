/*
 * creates a design doc
 */

'use strict'

const pcs = require('../views/pcs')

module.exports = () => ({
  _id: '_design/pcs',
  views: {
    pcs: {
      map: pcs.toString(),
      reduce: '_count'
    }
  }
})
