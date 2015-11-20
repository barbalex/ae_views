'use strict'

const PouchDB = require('pouchdb')
const couchPass = require('./couchPass.json')
const pcs = require('./views/pcs.js')
const rcs = require('./views/rcs.js')
const faunaById = require('./views/faunaById.js')
const fieldsOfGroup = require('./views/fieldsOfGroup.js')
const floraById = require('./views/floraById.js')
const macromycetesById = require('./views/macromycetesById.js')
const mooseById = require('./views/mooseById.js')
const objectsIdsByPcsName = require('./views/objectsIdsByPcsName.js')
const objectsIdsByRcsName = require('./views/objectsIdsByRcsName.js')

const couchUrl = `http://${couchPass.user}:${couchPass.pass}@127.0.0.1:5984/ae`
// const couchUrl = `http://${couchPass.user}:${couchPass.pass}@46.101.210.208:5984/ae`

const db = new PouchDB(couchUrl, () => {
  pcs(db)
  rcs(db)
  faunaById(db)
  fieldsOfGroup(db)
  floraById(db)
  macromycetesById(db)
  mooseById(db)
  objectsIdsByPcsName(db)
  objectsIdsByRcsName(db)
})
