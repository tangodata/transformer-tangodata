const walker = require('./walker')
const { yamlparser, mdparser } = require('./parser')

//////////////////////////////////////
const outfile = './dist/cities.json'
const infile =  './registry-tango-cities/cities/'
const pattern =  /\.ya?ml$/
const keyname = 'shortname'
const parser = yamlparser

walker( pattern, infile, keyname, parser, outfile,

  (count) => {
    console.log('Done', count)
  }
)

