module.exports = function (doc) {
  'use strict'
  function findStandardTaxonomyInDoc(dc) {
    var standardtaxonomie = null
    dc.Taxonomien.forEach(function (taxonomy) {
      if (taxonomy.Standardtaxonomie) standardtaxonomie = taxonomy
    })
    return standardtaxonomie
  }
  if (
    doc.Typ &&
    doc.Typ === 'Objekt' &&
    doc.Gruppe &&
    doc.Gruppe === 'Macromycetes' &&
    doc.Taxonomien
  ) {
    var standardtaxonomie = findStandardTaxonomyInDoc(doc)
    if (standardtaxonomie) {
      emit(standardtaxonomie.Eigenschaften['Taxonomie ID'], null)
    }
  }
}
