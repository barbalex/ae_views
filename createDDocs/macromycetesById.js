/*
 * creates a design doc
 */

'use strict'

const macromycetesById = require('../views/macromycetesById')

module.exports = () => ({
  _id: '_design/macromycetesById',
  views: {
    macromycetesById: {
      map: macromycetesById.toString()
    }
  }
})
