/*
 * creates a design doc
 */

'use strict'

const taxonomies = require('../views/taxonomies')

module.exports = () => ({
  _id: '_design/taxonomies',
  views: {
    taxonomies: {
      map: taxonomies.toString()
    }
  }
})
