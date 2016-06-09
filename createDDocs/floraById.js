/*
 * creates a design doc
 */

'use strict'

const floraById = require('../views/floraById')

module.exports = () => ({
  _id: '_design/floraById',
  views: {
    floraById: {
      map: floraById.toString()
    }
  }
})
