/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/objects',
  views: {
    'objects': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt') {
          window.emit(doc._id, null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/objects')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('objects index put')
      return db.query('objects')
    })
    .then((result) => console.log('objects index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('objects index put')
            return db.query('objects')
          })
          .then((result) => console.log('objects index queried'))
          .catch((error) => console.log(error))
      }
    })
}
