/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/mooseById',
  views: {
    'mooseById': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Moose') {
          emit(doc.Taxonomien[0].Eigenschaften['Taxonomie ID'], null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/mooseById')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('mooseById index put')
      return db.query('mooseById')
    })
    .then((result) => console.log('mooseById index queried'))
    .catch((error) => {
      // ignore if doc already exists
      if (error.status !== 409) console.log(error)
    })
}
