/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/tax',
  views: {
    'tax': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Taxonomien) {
          doc.Taxonomien.forEach(function (tc) {
            // add pcZusammenfassend
            var standard = !!tc.Standardtaxonomie
            var felder = {}
            Object.keys(tc).forEach(function (key) {
              if (key !== 'Name' && key !== 'Eigenschaften') {
                felder[key] = tc[key]
              }
            })
            emit([doc.Gruppe, standard, tc.Name, tc['Organisation mit Schreibrecht'], felder], null)
          })
        }
      }.toString(),
      reduce: '_count'
    }
  }
}

module.exports = (db) => {
  db.get('_design/tax')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('tax index put')
      return db.query('tax')
    })
    .then((result) => console.log('tax index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('tax index put')
            return db.query('tax')
          })
          .then((result) => console.log('tax index queried'))
          .catch((error) => console.log(error))
      }
    })
}
