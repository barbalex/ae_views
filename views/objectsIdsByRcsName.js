/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/objectsIdsByRcsName',
  views: {
    'objectsIdsByRcsName': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Beziehungssammlungen) {
          doc.Beziehungssammlungen.forEach(function (rc) {
            window.emit(rc.Name, doc._id)
          })
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/objectsIdsByRcsName')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('objectsIdsByRcsName index put')
      return db.query('objectsIdsByRcsName')
    })
    .then((result) => console.log('objectsIdsByRcsName index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('objectsIdsByRcsName index put')
            return db.query('objectsIdsByRcsName')
          })
          .then((result) => console.log('objectsIdsByRcsName index queried'))
          .catch((error) => console.log(error))
      }
    })
}
