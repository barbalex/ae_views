module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Objekt' &&
    doc.Eigenschaftensammlungen
  ) {
    doc.Eigenschaftensammlungen.forEach(function (pc) {
      // add pcZusammenfassend
      var pcZusammenfassend = !!pc.zusammenfassend
      var felder = {}
      Object.keys(pc).forEach(function (key) {
        if (
          key !== 'Typ' &&
          key !== 'Name' &&
          key !== 'Eigenschaften'
        ) {
          felder[key] = pc[key]
        }
      })
      emit([pc.Name, pcZusammenfassend, pc['Organisation mit Schreibrecht'], felder], null)
    })
  }
}
