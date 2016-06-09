module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Taxonomie-Objekt' &&
    doc.Taxonomie &&
    doc.Taxonomie === 'aa15e198-b8da-4f2e-8854-4c8293124f1e' &&
    doc.Objekt &&
    doc.Objekt.id &&
    doc.Objekt.Eigenschaften &&
    doc.Objekt.Eigenschaften['Taxonomie ID']
  ) {
    emit([doc.Objekt.Eigenschaften['Taxonomie ID']], { _id: doc.Objekt.id })
  }
}
