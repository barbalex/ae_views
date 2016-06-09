/*
 * creates a design doc
 */

'use strict'

const faunaById = require('../views/faunaById')

module.exports = () => ({
  _id: '_design/faunaById',
  views: {
    faunaById: {
      map: faunaById.toString()
    }
  }
})
