/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/faunaById',
  views: {
    'faunaById': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Fauna') {
          emit(doc.Taxonomien[0].Eigenschaften['Taxonomie ID'], null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/faunaById')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('faunaById index put')
      return db.query('faunaById')
    })
    .then((result) => console.log('faunaById index queried'))
    .catch((error) => {
      // ignore if doc already exists
      if (error.status !== 409) console.log(error)
    })
}
