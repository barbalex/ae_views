module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Taxonomie-Objekt'
  ) {
    emit([doc.Taxonomie, doc._id], null)
  }
}
