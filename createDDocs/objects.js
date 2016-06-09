/*
 * creates a design doc
 */

'use strict'

const objects = require('../views/objects')

module.exports = () => ({
  _id: '_design/objects',
  views: {
    objects: {
      map: objects.toString()
    }
  }
})
