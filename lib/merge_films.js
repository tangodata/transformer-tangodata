const { walker } = require('./walker')
const { yamlparser, yamllistparser, mdparser } = require('./parser')

//////////////////////////////////////
const outfile = './cache-tangodata/dist/films.json'
const infile =  './registry-tango-films/source/films/'
const pattern =  /\.md$/
const keyname = 'title'
const parser = mdparser

walker( pattern, infile, keyname, parser, outfile,

  (count) => {
    console.log('Done', count)
  }
)

