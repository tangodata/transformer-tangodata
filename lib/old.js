
const fs = require('fs')
const fw = require('filewalker')
const yaml = require('js-yaml')

function travDir(startDir, usePath, callback) {
  var parsedDir = []
  fs.readdir(startDir, function(err, dirList) {
      if (usePath) {
        startDir = fs.realpathSync(startDir)
      }
      if (err) {
        return callback(null, parsedDir)
      }
      var listLength = dirList.length
      if (!listLength) {
        return callback(null, parsedDir)
      }
      // loop through more list
      dirList.forEach( function(file) {
        if (file!='/') {
          file = startDir + '/' + file
        }
        fs.stat(file, function(err, stat) {
          parsedDir.push(file)
          if (stat & stat.isDirectory()) {
            // recurse
            travDir(file, function(err, parsed) {
              parsedDir = parsedDir.concat(parsed)
              if (!--listLength) {
                callback(null, parsedDir)
              }
            })
          } else {
            if (!--listLength) {
              callback(null, parsedDir)
            }
          }
        })
      })
  })

}


//var arg = '../bundle/registry-tango-lexicons/words/'
//var match = /\.md$/

var arg = '../bundle/registry-tango-cities/cities/'
var match = /\.ya?ml$/

/*
travDir(arg, true, function(err,result) {
if (err) {
            console.log(err);
        }
console.log(result);

})

*/

function get(filep) {
  try{
    var doc = yaml.safeLoad(
      fs.readFileSync(filep,'utf8')
    )
    var key = doc.shortname
    return {key:key, items:doc}
  }
  catch (e) {
    console.log('Cannot read', filep)
    return []
  }
}

var key = null
var bigitems = []
var items = {}
var n=1
var opt={
  matchRegExp: match
}
fw(arg,opt)
.on('file', function(p,s) {
  console.log('file ',n++,p)
  let {key, items} = get(arg + p)
  console.log('..',key,' has ',items)
  bigitems[key] = items
})
.on('done', function() {
  console.log('done')
  Object.keys(bigitems).forEach( n=>
    console.log('item ',n)
  )
 })
.walk()


