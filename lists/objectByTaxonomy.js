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
    while (row = getRow()) {
      result.rows.push(row.doc)
    }
  }
  send(JSON.stringify(result))
}
