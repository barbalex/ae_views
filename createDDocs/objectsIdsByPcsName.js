/*
 * creates a design doc
 */

'use strict'

const objectsIdsByPcsName = require('../views/objectsIdsByPcsName')

module.exports = () => ({
  _id: '_design/objectsIdsByPcsName',
  views: {
    objectsIdsByPcsName: {
      map: objectsIdsByPcsName.toString()
    }
  }
})
