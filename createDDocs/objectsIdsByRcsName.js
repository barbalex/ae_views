/*
 * creates a design doc
 */

'use strict'

const objectsIdsByRcsName = require('../views/objectsIdsByRcsName')

module.exports = () => ({
  _id: '_design/objectsIdsByRcsName',
  views: {
    objectsIdsByRcsName: {
      map: objectsIdsByRcsName.toString()
    }
  }
})
