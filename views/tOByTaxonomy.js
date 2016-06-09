module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Taxonomie-Objekt' &&
    doc.Taxonomie &&
    doc.Objekt &&
    doc.Objekt.id &&
    doc.Objekt.Eigenschaften &&
    doc.Objekt.Eigenschaften['Taxonomie ID']
  ) {
    emit([doc._id, 0], null)
    emit([doc._id, 1], { _id: doc.Objekt.id })
  }
}
