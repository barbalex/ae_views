/*
 * creates a design doc and puts it into the db
 */

'use strict'

const ddoc = {
  _id: '_design/fieldsOfGroup',
  views: {
    'fieldsOfGroup': {
      map: function (doc) {
        if (doc.Gruppe && doc.Typ && doc.Typ === 'Objekt' && doc.Taxonomien) {
          const standardtaxonomie = doc.Taxonomien.find((taxonomy) => taxonomy['Standardtaxonomie'])
          if (standardtaxonomie && standardtaxonomie.Eigenschaften) {
            const eigenschaften = standardtaxonomie.Eigenschaften
            Object.keys(eigenschaften).forEach((feldname) => {
              const feldwert = eigenschaften[feldname]
              emit([doc.Gruppe, 'taxonomy', doc.Taxonomie.Name, feldname, typeof feldwert], doc._id)
            })
          }

          if (doc.Eigenschaftensammlungen) {
            doc.Eigenschaftensammlungen.forEach((pc) => {
              if (pc.Eigenschaften) {
                const eigenschaften = pc.Eigenschaften
                Object.keys(eigenschaften).forEach((feldname) => {
                  const feldwert = eigenschaften[feldname]
                  emit([doc.Gruppe, 'propertyCollection', pc.Name, feldname, typeof feldwert], doc._id)
                })
              }
            })
          }

          if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
            doc.Beziehungssammlungen.forEach((beziehungssammlung) => {
              if (beziehungssammlung.Beziehungen && beziehungssammlung.Beziehungen.length > 0) {
                beziehungssammlung.Beziehungen.forEach((beziehung) => {
                  Object.keys(beziehung).forEach((feldname) => {
                    const feldwert = beziehung[feldname]
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
