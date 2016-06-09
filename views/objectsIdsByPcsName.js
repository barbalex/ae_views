module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Objekt' &&
    doc.Eigenschaftensammlungen
  ) {
    doc.Eigenschaftensammlungen.forEach(function (es) {
      emit(es.Name, doc._id)
    })
  }
}
