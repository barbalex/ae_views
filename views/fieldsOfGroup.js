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
          if (doc.Taxonomien && doc.Taxonomien[0] && doc.Taxonomien[0].Eigenschaften) {
            var eigenschaften = doc.Taxonomien[0].Eigenschaften
            Object.keys(eigenschaften).forEach(function (feldname) {
              var feldwert = eigenschaften[feldname]
              emit([doc.Gruppe, 'taxonomy', doc.Taxonomie.Name, feldname, typeof feldwert], doc._id)
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

          if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
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
      // ignore if doc already exists
      if (error.status !== 409) console.log(error)
    })
}
