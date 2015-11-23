/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/rcs',
  views: {
    'rcs': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Beziehungssammlungen) {
          doc.Beziehungssammlungen.forEach((rc) => {
            // add rcCombining
            const rcCombining = !!rc.zusammenfassend
            let felder = {}
            Object.keys(rc).forEach((key) => {
              if (key !== 'Typ' && key !== 'Name' && key !== 'Eigenschaften') {
                felder[key] = rc[key]
              }
            })
            emit([rc.Name, rcCombining, rc['importiert von'], felder], null)
          })
        }
      }.toString(),
      reduce: '_count'
    }
  }
}

module.exports = (db) => {
  db.get('_design/rcs')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('rcs index put')
      return db.query('rcs')
    })
    .then((result) => console.log('rcs index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('rcs index put')
            return db.query('rcs')
          })
          .then((result) => console.log('rcs index queried'))
          .catch((error) => console.log(error))
      }
    })
}
