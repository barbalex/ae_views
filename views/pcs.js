/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/pcs',
  views: {
    'pcs': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt') {
          if (doc.Eigenschaftensammlungen) {
            doc.Eigenschaftensammlungen.forEach(function (pc) {
              // add pcZusammenfassend
              const pcZusammenfassend = !!pc.zusammenfassend
              var felder = {}
              Object.keys(pc).forEach(function (key) {
                if (key !== 'Typ' && key !== 'Name' && key !== 'Eigenschaften') {
                  felder[key] = pc[key]
                }
              })
              emit([pc.Name, pcZusammenfassend, pc['importiert von'], felder], null)
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
      console.log('pcs index put')
      return db.query('pcs')
    })
    .then((result) => console.log('pcs index queried'))
    .catch((error) => {
      // ignore if doc already exists
      if (error.status !== 409) console.log(error)
    })
}
