module.exports = function (doc) {
  'use strict'
  var standardtaxonomie
  if (
    doc.Typ &&
    doc.Typ === 'Objekt' &&
    doc.Gruppe &&
    doc.Gruppe === 'Flora' &&
    doc.Taxonomien
  ) {
    standardtaxonomie = findStandardTaxonomyInDoc(doc)
    if (standardtaxonomie) {
      emit(standardtaxonomie.Eigenschaften['Taxonomie ID'], null)
    }
  }
  function findStandardTaxonomyInDoc(dc) {
    var stdTaxonomie = null
    dc.Taxonomien.forEach(function (taxonomy) {
      if (taxonomy.Standardtaxonomie) {
        stdTaxonomie = taxonomy
      }
    })
    return stdTaxonomie
  }
}
