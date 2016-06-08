/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/groups',
  views: {
    groups: {
      map: function (doc) {
        if (
          doc.Typ &&
          doc.Typ === 'Gruppe' &&
          doc.Name
        ) {
          emit(doc.Name, null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/groups')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then(() => {
      console.log('groups index put')
      return db.query('groups')
    })
    .then(() => console.log('groups index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then(() => {
            console.log('groups index put')
            return db.query('groups')
          })
          .then(() => console.log('groups index queried'))
          .catch((err) => console.log(err))
      }
    })
}
