const fs = require('fs')
const stringify = require('json-stringify-pretty-compact')
const path = require('path')
const fwalker = require('filewalker')

module.exports =
function walker(match, cwd, field, pars, outfile, fn1) {

  const opt={
    matchRegExp: match
  }
  var count=0
  var rc = []

  fwalker(cwd,opt,field)
  .on('file', function(p,s){
    count+=1
    let fullname = path.resolve(cwd, p)
    console.log('Found', count, '=', p)
    let decoded = pars(fullname, field)
    if (!decoded) {
      console.log('Error!')
    } else {
      rc[decoded.key] = decoded.items
    }
  })
  .on('done', () => {
    var qitem = Object.assign( {}, rc)
    var jsonstr = stringify(qitem)
    fs.writeFileSync(outfile, jsonstr)
    fn1( count )
  })
  .walk()

}

