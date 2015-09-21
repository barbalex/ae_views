/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/objectsIdsByPcsName',
  views: {
    'objectsIdsByPcsName': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt') {
          if (doc.Eigenschaftensammlungen) {
            doc.Eigenschaftensammlungen.forEach(function (es) {
              emit(es.Name, doc._id)
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
      console.log('objectsIdsByPcsName index put')
      return db.query('objectsIdsByPcsName')
    })
    .then((result) => console.log('objectsIdsByPcsName index queried'))
    .catch((error) => {
      // ignore if doc already exists
      if (error.status !== 409) console.log(error)
    })
}
