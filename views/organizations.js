/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/organizations',
  views: {
    'organizations': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Organisation') {
          window.emit(doc._id, null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/organizations')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('organizations index put')
      return db.query('organizations')
    })
    .then((result) => console.log('organizations index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('organizations index put')
            return db.query('organizations')
          })
          .then((result) => console.log('organizations index queried'))
          .catch((error) => console.log(error))
      }
    })
}
