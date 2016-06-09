/*
 * creates a design doc
 */

'use strict'

const floraBySisf2TaxId = require('../views/floraBySisf2TaxId')
const floraBySisf2TaxIdList = require('../lists/floraBySisf2TaxId')

module.exports = () => ({
  _id: '_design/floraBySisf2TaxId',
  views: {
    floraBySisf2TaxId: {
      map: floraBySisf2TaxId.toString()
    }
  },
  lists: {
    floraBySisf2TaxId: floraBySisf2TaxIdList.toString()
  }
})
