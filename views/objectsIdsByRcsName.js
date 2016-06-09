module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Objekt' &&
    doc.Beziehungssammlungen
  ) {
    doc.Beziehungssammlungen.forEach(function (rc) {
      emit(rc.Name, doc._id)
    })
  }
}
