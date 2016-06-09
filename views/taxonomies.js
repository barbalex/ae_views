module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Taxonomie' &&
    doc.Gruppe &&
    doc.Name
  ) {
    emit([doc.Gruppe, doc.Name], null)
  }
}
