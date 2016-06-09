'use strict'

const _ = require('lodash')

const prepareDDoc = (dDoc) => {
  const dDocToCompare = _.cloneDeep(dDoc)
  // ddoc gets a rev in CouchDB, need to remove it to compare old with new
  delete dDocToCompare._rev
  // need strings to compare
  return JSON.stringify(dDocToCompare)
}

module.exports = (dDoc1, dDoc2) => {
  const dDoc1ToCompare = prepareDDoc(dDoc1)
  const dDoc2ToCompare = prepareDDoc(dDoc2)
  return dDoc1ToCompare === dDoc2ToCompare
}
