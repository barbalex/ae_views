/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/floraById',
  views: {
    floraById: {
      map: function (doc) {
        function findStandardTaxonomyInDoc (doc) {
          var standardtaxonomie = null
          doc.Taxonomien.forEach(function (taxonomy) {
            if (taxonomy.Standardtaxonomie) {
              standardtaxonomie = taxonomy
            }
          })
          return standardtaxonomie
        }
        if (
          doc.Typ &&
          doc.Typ === 'Objekt' &&
          doc.Gruppe &&
          doc.Gruppe === 'Flora' &&
          doc.Taxonomien
        ) {
          var standardtaxonomie = findStandardTaxonomyInDoc(doc)
          if (standardtaxonomie) {
            emit(standardtaxonomie.Eigenschaften['Taxonomie ID'], null)
          }
        }
      }.toString()
    }
  }
}

module.exports = (db) => {
  db.get('_design/floraById')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then(() => {
      console.log('floraById index put')
      return db.query('floraById')
    })
    .then(() => console.log('floraById index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then(() => {
            console.log('floraById index put')
            return db.query('floraById')
          })
          .then(() => console.log('floraById index queried'))
          .catch((err) => console.log(err))
      }
    })
}
