module.exports = function (doc) {
  'use strict'
  if (
    doc.Gruppe &&
    doc.Typ &&
    doc.Typ === 'Objekt'
  ) {
    if (doc.Taxonomien) {
      doc.Taxonomien.forEach(function (taxonomy) {
        var eigenschaften
        if (taxonomy.Eigenschaften) {
          eigenschaften = taxonomy.Eigenschaften
          Object.keys(eigenschaften).forEach(function (feldname) {
            var feldwert = eigenschaften[feldname]
            emit([doc.Gruppe, 'taxonomy', taxonomy.Name, feldname, typeof feldwert], doc._id)
          })
        }
      })
    }

    if (doc.Eigenschaftensammlungen) {
      doc.Eigenschaftensammlungen.forEach(function (pc) {
        var eigenschaften
        if (pc.Eigenschaften) {
          eigenschaften = pc.Eigenschaften
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
              // irgendwie liefert dieser Loop auch Zahlen,
              // die aussehen als wären sie die keys eines Arrays. Ausschliessen
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
}
