/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/mooseById',
  views: {
    'mooseById': {
      map: function (doc) {
        function findStandardTaxonomyInDoc (doc) {
          var standardtaxonomie = null
          doc.Taxonomien.forEach(function (taxonomy) {
            if (taxonomy.Standardtaxonomie) standardtaxonomie = taxonomy
          })
          return standardtaxonomie
        }
        if (doc.Typ && doc.Typ === 'Objekt' && doc.Gruppe && doc.Gruppe === 'Moose' && doc.Taxonomien) {
          var standardtaxonomie = findStandardTaxonomyInDoc(doc)
          if (standardtaxonomie) window.emit(standardtaxonomie.Eigenschaften['Taxonomie ID'], null)
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
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('mooseById index put')
            return db.query('mooseById')
          })
          .then((result) => console.log('mooseById index queried'))
          .catch((error) => console.log(error))
      }
    })
}
