const { walker } = require('./walker')
const { yamlparser, yamllistparser, mdparser } = require('./parser')

//////////////////////////////////////
const outfile = './dist/lexicons.json'
const infile =  './registry-tango-lexicons/words/'
const pattern =  /\.md$/
const keyname = 'term'
const parser = mdparser

walker( pattern, infile, keyname, parser, outfile,

  (count) => {
    console.log('Done', count)
  }
)

