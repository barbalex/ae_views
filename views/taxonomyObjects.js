/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/taxonomyObjects',
  views: {
    taxonomyObjects: {
      map: function (doc) {
        if (
          doc.Typ &&
          doc.Typ === 'Taxonomie-Objekt'
        ) {
          emit(doc._id, null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/taxonomyObjects')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then(() => {
      console.log('taxonomyObjects index put')
      return db.query('taxonomyObjects')
    })
    .then(() => console.log('taxonomyObjects index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then(() => {
            console.log('taxonomyObjects index put')
            return db.query('taxonomyObjects')
          })
          .then(() => console.log('taxonomyObjects index queried'))
          .catch((err) => console.log(err))
      }
    })
}
