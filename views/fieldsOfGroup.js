/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/fieldsOfGroup',
  views: {
    'fieldsOfGroup': {
      map: function (doc) {
        if (doc.Gruppe && doc.Typ && doc.Typ === 'Objekt') {
          if (doc.Taxonomien) {
            doc.Taxonomien.forEach(function (taxonomy) {
              if (taxonomy.Eigenschaften) {
                var eigenschaften = taxonomy.Eigenschaften
                Object.keys(eigenschaften).forEach(function (feldname) {
                  var feldwert = eigenschaften[feldname]
                  emit([doc.Gruppe, 'taxonomy', taxonomy.Name, feldname, typeof feldwert], doc._id)
                })
              }
            })
          }

          if (doc.Eigenschaftensammlungen) {
            doc.Eigenschaftensammlungen.forEach(function (pc) {
              if (pc.Eigenschaften) {
                var eigenschaften = pc.Eigenschaften
                Object.keys(eigenschaften).forEach(function (feldname) {
                  var feldwert = eigenschaften[feldname]
                  emit([doc.Gruppe, 'propertyCollection', pc.Name, feldname, typeof feldwert], doc._id)
                })
              }
            })
          }

          if (doc.Beziehungssammlungen) {
            doc.Beziehungssammlungen.forEach(function (beziehungssammlung) {
              if (beziehungssammlung.Beziehungen && beziehungssammlung.Beziehungen.length > 0) {
                beziehungssammlung.Beziehungen.forEach(function (beziehung) {
                  Object.keys(beziehung).forEach(function (feldname) {
                    var feldwert = beziehung[feldname]
                    // irgendwie liefert dieser Loop auch Zahlen, die aussehen als wären sie die keys eines Arrays. Ausschliessen
                    if (isNaN(parseInt(feldname, 10))) {
                      // jetzt loopen wir durch die Daten der Beziehung
                      emit([doc.Gruppe, 'relation', beziehungssammlung.Name, feldname, typeof feldwert], doc._id)
                    }
                  })
                })
              }
            })
          }
        }
      }.toString(),
      reduce: '_count'
    }
  }
}

module.exports = (db) => {
  db.get('_design/fieldsOfGroup')
    .then((doc) => db.remove(doc))
    .then(() => db.put(ddoc))
    .then((response) => {
      console.log('fieldsOfGroup index put')
      return db.query('fieldsOfGroup')
    })
    .then((result) => console.log('fieldsOfGroup index queried'))
    .catch((error) => {
      if (error.status === 404) {
        // doc not found when getting
        db.put(ddoc)
          .then((response) => {
            console.log('fieldsOfGroup index put')
            return db.query('fieldsOfGroup')
          })
          .then((result) => console.log('fieldsOfGroup index queried'))
          .catch((error) => console.log(error))
      }
    })
}
