/*
 * creates a design doc
 */

'use strict'

const mooseById = require('../views/mooseById')

module.exports = () => ({
  _id: '_design/mooseById',
  views: {
    mooseById: {
      map: mooseById.toString()
    }
  }
})
