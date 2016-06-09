'use strict'

const fs = require('fs')

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

dDocFilenames.forEach((dDocFilename) => {
  const dDocName = dDocFilename.replace('.js', '')
  const dDoc = require(`./createDDocs/${dDocName}`)
  db.get(`_design/${dDocName}`)
    .then((doc) => db.remove(doc))
    .then(() => db.put(dDoc()))
    .then(() => {
      console.log(`${dDocName} index put`)
      return db.query(dDocName)
    })
    .then(() => console.log(`${dDocName} index queried`))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(dDoc())
          .then(() => {
            console.log(`${dDocName} index put`)
            return db.query(dDocName)
          })
          .then(() => console.log(`${dDocName} index queried`))
          .catch((err) => console.log(err))
      }
    })
})

// removeArtendbDDoc(db)
/*
faunaById(db)
fieldsOfGroup(db)
floraById(db)
groups(db)
macromycetesById(db)
mooseById(db)
objects(db)
objectsIdsByPcsName(db)
objectsIdsByRcsName(db)
organizations(db)
pcs(db)
rcs(db)
taxonomies(db)
taxonomyObjects(db)
tOByTaxonomy(db)
tcs(db)
*/
groupFilter(db)
