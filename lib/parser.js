const fs = require('fs')
const slugify = require('slugify')

//const { fs, path, hash, parseFrontmatter, inferTitle, extractHeaders } = require('@vuepress/shared-utils')
//const md = require('@vuepress/markdown')

const matter = require('gray-matter')
const yaml = require('js-yaml')



function yamlparser(filep, field) {
  try {
    var doc = yaml.safeLoad(
      fs.readFileSync(filep,'utf8')
    )
    return {
      key: slugify(doc[field]).toLowerCase(),
      items: doc
   }
  }
  catch (e) {
    console.log('Cannot read', filep)
    return null
  }
}


function mdparser(filep, field) {
  const opts = {
    excerpt_separator: '<!-- more -->',
    engines: { excerpt: false }
  }

  try {
    var src = fs.readFileSync(filep,'utf8')
    var fm = matter(src, opts)
    fm.data.mdcontent = fm.content
    delete fm.content
    console.log('We have read',filep)
    //console.log('======\n',fm)
    return {
      key: slugify(fm.data[field]).toLowerCase(),
      items: fm.data}
  }
  catch (e) {
    console.log('Cannot read', filep)
    return null
  }

}


module.exports = {
  yamlparser,
  mdparser
}
