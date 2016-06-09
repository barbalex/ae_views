/*
 * removes design doc artendb
 */

'use strict'

module.exports = (db) =>
  db.get('_design/artendb')
    .then((doc) => db.remove(doc))
    .then((response) => console.log('artendb removed, response', response))
    .catch((error) => console.log(error))
