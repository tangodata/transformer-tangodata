const fs = require('fs')
const slugify = require('slugify')
const matter = require('gray-matter')
const yaml = require('js-yaml')


// convert one doc to one object
function mdparser(filep, field) {
  const opts = {
    excerpt_separator: '<!-- more -->',
    engines: { excerpt: false }
  }

  try {
    const src = fs.readFileSync(filep,'utf8')
    var doc = matter(src, opts)
    doc.data.mdcontent = doc.content
    delete doc.content
    console.log('We have read',filep)
    const keyn = slugify(doc.data[field]).toLowerCase()
    return {
      [keyn]: doc.data,
    }
  }
  catch (e) {
    console.log('Cannot read', filep, "\n", e)
    return null
  }

}

// convert one doc to one object
function yamlparser(filep, field) {
  try {
    var src = fs.readFileSync(filep,'utf8')
    var doc = yaml.safeLoad(src)
    if (!doc[field]) {
      console.log('Error in ',field,' data:',doc)
      return null
    } else {
      const keyn = slugify(doc[field]).toLowerCase()
      return {
        [keyn]: doc
      }
    }
  }
  catch (e) {
    console.log('Cannot read', filep, "\n", e)
    return null
  }
}

// convert one doc into array of objects
function yamllistparser(filep, field) {
  try {
    var src = fs.readFileSync(filep,'utf8')
    var doc = yaml.safeLoad(src)
    var keyn
    var items = {}
    doc.forEach( n => {
      if (!n[field]) {
        console.log('Error in ',field,' data:',n)
      } else {
        keyn = slugify(n[field]).toLowerCase()
        items[keyn] = n
      }
    })
    return items
  }
  catch (e) {
    console.log('Cannot read', filep, "\n", e)
    return null
  }
}

module.exports = {
  mdparser,
  yamlparser,
  yamllistparser
}
