/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/pcs',
  views: {
    'pcs': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Eigenschaftensammlungen) {
          doc.Eigenschaftensammlungen.forEach(function (pc) {
            // add pcZusammenfassend
            var pcZusammenfassend = !!pc.zusammenfassend
            var felder = {}
            Object.keys(pc).forEach(function (key) {
              if (key !== 'Typ' && key !== 'Name' && key !== 'Eigenschaften') {
                felder[key] = pc[key]
              }
            })
            emit([pc.Name, pcZusammenfassend, pc['Organisation mit Schreibrecht'], felder], null)
          })
        }
      }.toString(),
      reduce: '_count'
    }
  }
}

module.exports = (db) => {
  db.get('_design/pcs')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('pcs index put')
      return db.query('pcs')
    })
    .then((result) => console.log('pcs index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('pcs index put')
            return db.query('pcs')
          })
          .then((result) => console.log('pcs index queried'))
          .catch((error) => console.log(error))
      }
    })
}
