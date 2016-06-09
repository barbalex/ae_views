/*
 * creates a design doc
 */

'use strict'

const tOByTaxonomy = require('../views/tOByTaxonomy')
const objectByTaxonomy = require('../lists/objectByTaxonomy')

module.exports = () => ({
  _id: '_design/tOByTaxonomy',
  views: {
    tOByTaxonomy: {
      map: tOByTaxonomy.toString()
    }
  },
  lists: {
    objectByTaxonomy: objectByTaxonomy.toString()
  }
})
