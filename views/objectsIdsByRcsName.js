/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/objectsIdsByRcsName',
  views: {
    'objectsIdsByRcsName': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt') {
          if (doc.Beziehungssammlungen) {
            doc.Beziehungssammlungen.forEach(function (rc) {
              emit(rc.Name, doc._id)
            })
          }
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.put(ddoc)
    .then((response) => {
      console.log('objectsIdsByRcsName index put')
      return db.query('objectsIdsByRcsName')
    })
    .then((result) => console.log('objectsIdsByRcsName index queried'))
    .catch((error) => {
      // ignore if doc already exists
      if (error.status !== 409) console.log(error)
    })
}
