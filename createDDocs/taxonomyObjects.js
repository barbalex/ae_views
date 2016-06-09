/*
 * creates a design doc
 */

'use strict'

const taxonomyObjects = require('../views/taxonomyObjects')

module.exports = () => ({
  _id: '_design/taxonomyObjects',
  views: {
    taxonomyObjects: {
      map: taxonomyObjects.toString()
    }
  }
})
