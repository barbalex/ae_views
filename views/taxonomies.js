/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/taxonomies',
  views: {
    taxonomies: {
      map: function (doc) {
        if (
          doc.Typ &&
          doc.Typ === 'Taxonomie' &&
          doc.Gruppe &&
          doc.Name
        ) {
          emit([doc.Gruppe, doc.Name], null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/taxonomies')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then(() => {
      console.log('taxonomies index put')
      return db.query('taxonomies')
    })
    .then(() => console.log('taxonomies index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then(() => {
            console.log('taxonomies index put')
            return db.query('taxonomies')
          })
          .then(() => console.log('taxonomies index queried'))
          .catch((err) => console.log(err))
      }
    })
}
