/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/macromycetesById',
  views: {
    macromycetesById: {
      map: function (doc) {
        function findStandardTaxonomyInDoc(dc) {
          var standardtaxonomie = null
          dc.Taxonomien.forEach(function (taxonomy) {
            if (taxonomy.Standardtaxonomie) standardtaxonomie = taxonomy
          })
          return standardtaxonomie
        }
        if (
          doc.Typ &&
          doc.Typ === 'Objekt' &&
          doc.Gruppe &&
          doc.Gruppe === 'Macromycetes' &&
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
  db.get('_design/macromycetesById')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then(() => {
      console.log('macromycetesById index put')
      return db.query('macromycetesById')
    })
    .then(() => console.log('macromycetesById index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then(() => {
            console.log('macromycetesById index put')
            return db.query('macromycetesById')
          })
          .then(() => console.log('macromycetesById index queried'))
          .catch((err) => console.log(err))
      }
    })
}
