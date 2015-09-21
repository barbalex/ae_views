/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/rcs',
  views: {
    'rcs': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt') {
          if (doc.Beziehungssammlungen) {
            doc.Beziehungssammlungen.forEach(function (rc) {
              // add bsZusammenfassend
              const bsZusammenfassend = !!rc.zusammenfassend
              var felder = {}
              Object.keys(rc).forEach(function (key) {
                if (key !== 'Typ' && key !== 'Name' && key !== 'Eigenschaften') {
                  felder[key] = rc[key]
                }
              })
              emit([rc.Name, bsZusammenfassend, rc['importiert von'], felder], null)
            })
          }
        }
      }.toString(),
      reduce: '_count'
    }
  }
}

module.exports = (db) => {
  db.put(ddoc)
    .then((response) => {
      console.log('rcs index put')
      return db.query('rcs')
    })
    .then((result) => console.log('rcs index queried'))
    .catch((error) => {
      // ignore if doc already exists
      if (error.status !== 409) reject(error)
    })
}
