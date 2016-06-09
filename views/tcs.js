module.exports = function (doc) {
  'use strict'
  if (
    doc.Typ &&
    doc.Typ === 'Objekt' &&
    doc.Gruppe &&
    doc.Taxonomien
  ) {
    doc.Taxonomien.forEach(function (tc) {
      // add pcZusammenfassend
      var standard = !!tc.Standardtaxonomie
      var felder = {}
      Object.keys(tc).forEach(function (key) {
        if (
          key !== 'Name' &&
          key !== 'Eigenschaften'
        ) {
          felder[key] = tc[key]
        }
      })
      emit([doc.Gruppe, standard, tc.Name, tc['Organisation mit Schreibrecht'], felder], null)
    })
  }
}
