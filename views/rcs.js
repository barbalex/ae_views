module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Objekt' &&
    doc.Beziehungssammlungen
  ) {
    doc.Beziehungssammlungen.forEach(function (rc) {
      // add rcCombining
      var rcCombining = !!rc.zusammenfassend
      var felder = {}
      Object.keys(rc).forEach(function (key) {
        if (
          key !== 'Typ' &&
          key !== 'Name' &&
          key !== 'Eigenschaften'
        ) {
          felder[key] = rc[key]
        }
      })
      emit([rc.Name, rcCombining, rc['Organisation mit Schreibrecht'], felder], null)
    })
  }
}
