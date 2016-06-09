module.exports = function (doc) {
  'use strict'
  function findStandardTaxonomyInDoc (doc) {
    var standardtaxonomie = null
    doc.Taxonomien.forEach(function (taxonomy) {
      if (taxonomy.Standardtaxonomie) {
        standardtaxonomie = taxonomy
      }
    })
    return standardtaxonomie
  }
  if (
    doc.Typ &&
    doc.Typ === 'Objekt' &&
    doc.Gruppe &&
    doc.Gruppe === 'Flora' &&
    doc.Taxonomien
  ) {
    var standardtaxonomie = findStandardTaxonomyInDoc(doc)
    if (standardtaxonomie) {
      emit(standardtaxonomie.Eigenschaften['Taxonomie ID'], null)
    }
  }
}
