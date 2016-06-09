/*
 * creates a design doc
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

module.exports = (db) =>
  new Promise((resolve, reject) => {
    db.get('_design/groupFilter')
      // remove existing filter doc
      .then((doc) => db.remove(doc))
      .then(() => db.put(ddoc))
      .then(() => {
        console.log('group filter put')
        resolve()
      })
      .catch((error) => {
        if (error.status === 404) {
          // doc not found when getting
          db.put(ddoc)
            .then(() => {
              console.log('group filter put')
              resolve()
            })
            .catch((err) => reject(err))
        }
      })
  })
