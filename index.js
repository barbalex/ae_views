'use strict'

const fs = require('fs')
const _ = require('lodash')

const PouchDB = require('pouchdb')
const couchPass = require('./couchPass.json')

const removeArtendbDDoc = require('./removeArtendbDDoc.js')

/*
const faunaById = require('./createDDocs/faunaById.js')
const fieldsOfGroup = require('./createDDocs/fieldsOfGroup.js')
const floraById = require('./createDDocs/floraById.js')
const groups = require('./createDDocs/groups.js')
const macromycetesById = require('./createDDocs/macromycetesById.js')
const mooseById = require('./createDDocs/mooseById.js')
const objects = require('./createDDocs/objects.js')
const objectsIdsByPcsName = require('./createDDocs/objectsIdsByPcsName.js')
const objectsIdsByRcsName = require('./createDDocs/objectsIdsByRcsName.js')
const organizations = require('./createDDocs/organizations.js')
const pcs = require('./createDDocs/pcs.js')
const rcs = require('./createDDocs/rcs.js')
const taxonomies = require('./createDDocs/taxonomies.js')
const taxonomyObjects = require('./createDDocs/taxonomyObjects.js')
const tOByTaxonomy = require('./createDDocs/tOByTaxonomy.js')
const tcs = require('./createDDocs/tcs.js')
*/
const groupFilter = require('./filters/groupFilter.js')

const couchUrl = `http://${couchPass.user}:${couchPass.pass}@127.0.0.1:5984/artendb`
// const couchUrl = `http://${couchPass.user}:${couchPass.pass}@46.101.210.208:5984/artendb`

const db = new PouchDB(couchUrl)

// get an array of all filenames in ./createDDocs
const dDocFilenames = fs.readdirSync('./createDDocs')

dDocFilenames.forEach((dDocFilename, index) => {
  const dDocName = dDocFilename.replace('.js', '')
  const dDoc = require(`./createDDocs/${dDocName}`)
  db.get(`_design/${dDocName}`)
    .then((oldDDoc) => {
      const oldDDocToCompare = _.cloneDeep(oldDDoc)
      // ddoc gets a rev in CouchDB, need to remove it to compare old with new
      delete oldDDocToCompare._rev
      const dDocHasChanged = JSON.stringify(oldDDocToCompare) !== JSON.stringify(dDoc())
      // only replace ddoc if it has changed
      if (dDocHasChanged) {
        db.remove(oldDDoc)
          .then(() => db.put(dDoc()))
          .then(() => {
            console.log(`${dDocName} ddoc put`)
            return db.query(dDocName)
          })
          .then(() => console.log(`${dDocName} view queried`))
          .catch((err) => console.log(err))
      } else {
        console.log(`${dDocName} unchangged`)
      }
    })
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(dDoc())
          .then(() => {
            console.log(`${dDocName} ddoc put`)
            return db.query(dDocName)
          })
          .then(() => console.log(`${dDocName} view queried`))
          .catch((err) => console.log(err))
      }
    })
})

// removeArtendbDDoc(db)
groupFilter(db)
