/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/floraById',
  views: {
    'floraById': {
      map: function (doc) {
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Flora' && doc.Taxonomien) {
          const standardtaxonomie = doc.Taxonomien.find((taxonomy) => taxonomy['Standardtaxonomie'])
          if (standardtaxonomie) emit(standardtaxonomie.Eigenschaften['Taxonomie ID'], null)
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/floraById')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('floraById index put')
      return db.query('floraById')
    })
    .then((result) => console.log('floraById index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('floraById index put')
            return db.query('floraById')
          })
          .then((result) => console.log('floraById index queried'))
          .catch((error) => console.log(error))
      }
    })
}
