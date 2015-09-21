/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/macromycetesById',
  views: {
    'macromycetesById': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Macromycetes') {
          emit(doc.Taxonomien[0].Eigenschaften['Taxonomie ID'], null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/macromycetesById')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('macromycetesById index put')
      return db.query('macromycetesById')
    })
    .then((result) => console.log('macromycetesById index queried'))
    .catch((error) => {
      // ignore if doc already exists
      if (error.status !== 409) console.log(error)
    })
}
