'use strict'

const fs = require('fs')

const PouchDB = require('pouchdb')
const couchPass = require('./couchPass.json')

const removeArtendbDDoc = require('./src/removeArtendbDDoc.js')
const dDocsAreEqual = require('./src/dDocsAreEqual.js')

const createGroupFilter = require('./filters/groupFilter.js')

const couchUrl = `http://${couchPass.user}:${couchPass.pass}@127.0.0.1:5984/artendb`
// const couchUrl = `http://${couchPass.user}:${couchPass.pass}@46.101.210.208:5984/artendb`

const db = new PouchDB(couchUrl)

// get an array of all filenames in ./createDDocs
const dDocFilenames = fs.readdirSync('./createDDocs')

// removeArtendbDDoc(db)
createGroupFilter(db)
  .then(() => {
    dDocFilenames.forEach((dDocFilename, index) => {
      const dDocName = dDocFilename.replace('.js', '')
      const dDoc = require(`./createDDocs/${dDocName}`)
      const newDDoc = dDoc()
      db.get(`_design/${dDocName}`)
        .then((oldDDoc) => {
          // only replace ddoc if it has changed
          if (dDocsAreEqual(oldDDoc, newDDoc)) {
            console.log(`${dDocName} unchangged`)
          } else {
            db.remove(oldDDoc)
              .then(() => db.put(newDDoc))
              .then(() => {
                console.log(`${dDocName} ddoc put`)
                return db.query(dDocName)
              })
              .then(() => console.log(`${dDocName} view queried`))
              .catch((err) => console.log(err))
          }
        })
        .catch((error) => {
          if (error.status && error.status === 404) {
            // doc not found when getting
            db.put(newDDoc)
              .then(() => {
                console.log(`${dDocName} ddoc put`)
                return db.query(dDocName)
              })
              .then(() => console.log(`${dDocName} view queried`))
              .catch((err) => console.log(err))
          } else {
            console.log(error)
          }
        })
    })
  })
  .catch((error) => console.log(error))
