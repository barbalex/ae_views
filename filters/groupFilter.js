/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/groupFilter',
  filters: {
    groupFilter: function groupFilter(doc, req) {
      return (
        doc.Typ &&
        doc.Typ === 'Objekt' &&
        doc.Gruppe &&
        doc.Gruppe === req.query.type
      )
    }.toString()
  }
}

module.exports = (db) => {
  db.get('_design/groupFilter')
    // remove existing filter doc
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then(() => {
      console.log('group filter put')
    })
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then(() => {
            console.log('group filter put')
          })
          .catch((err) => console.log(err))
      }
    })
}
