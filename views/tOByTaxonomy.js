/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/tOByTaxonomy',
  views: {
    tOByTaxonomy: {
      map: function (doc) {
        if (
          doc.Typ &&
          doc.Typ === 'Taxonomie-Objekt'
        ) {
          emit([doc.Taxonomie, doc._id], null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/tOByTaxonomy')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then(() => {
      console.log('tOByTaxonomy index put')
      return db.query('tOByTaxonomy')
    })
    .then(() => console.log('tOByTaxonomy index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then(() => {
            console.log('tOByTaxonomy index put')
            return db.query('tOByTaxonomy')
          })
          .then(() => console.log('tOByTaxonomy index queried'))
          .catch((err) => console.log(err))
      }
    })
}
