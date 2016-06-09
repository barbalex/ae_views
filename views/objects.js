module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Objekt'
  ) {
    emit(doc._id, null)
  }
}
