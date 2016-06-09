module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Organisation'
  ) {
    emit(doc._id, null)
  }
}
