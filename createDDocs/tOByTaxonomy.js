/*
 * creates a design doc
 */

'use strict'

const tOByTaxonomy = require('../views/tOByTaxonomy')

module.exports = () => ({
  _id: '_design/tOByTaxonomy',
  views: {
    tOByTaxonomy: {
      map: tOByTaxonomy.toString()
    }
  },
  lists: {
    objectByTaxonomy: function(head, req) {
      'use strict'
      
    }.toString()
  }
})
