module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Gruppe' &&
    doc.Name
  ) {
    emit(doc.Name, null)
  }
}
