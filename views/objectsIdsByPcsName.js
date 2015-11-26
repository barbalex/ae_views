/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/objectsIdsByPcsName',
  views: {
    'objectsIdsByPcsName': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Eigenschaftensammlungen) {
          doc.Eigenschaftensammlungen.forEach(function (es) {
            window.emit(es.Name, doc._id)
          })
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/objectsIdsByPcsName')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('objectsIdsByPcsName index put')
      return db.query('objectsIdsByPcsName')
    })
    .then((result) => console.log('objectsIdsByPcsName index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('objectsIdsByPcsName index put')
            return db.query('objectsIdsByPcsName')
          })
          .then((result) => console.log('objectsIdsByPcsName index queried'))
          .catch((error) => console.log(error))
      }
    })
}
