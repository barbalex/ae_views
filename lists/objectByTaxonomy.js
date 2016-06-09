module.exports = function (head, req) {
  var result
  if (req.query.include_docs != 'true') {
    start({
      code: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = {
      error: 'I require include_docs=true'
    }
  } else {
    start({
      headers: {
        'Accept-Charset': 'utf-8',
        'Content-Type': 'json; charset=utf-8;',
        'Accept-Encoding': 'gzip,deflate'
      }
    })
    result = { rows: [] }
    var objekt
    while (row = getRow()) {
      const rowIsTaxObjekt = row.key[1] === 0
      const rowIsObjekt = row.key[1] === 1
      if (rowIsTaxObjekt) {
        objekt = {}
        objekt.taxObj = row.doc
      }
      if (rowIsObjekt) {
        objekt.obj = row.doc
        result.rows.push(objekt)
      }
    }
  }
  send(JSON.stringify(result))
}
