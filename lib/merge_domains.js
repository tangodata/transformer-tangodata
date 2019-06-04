const { walker } = require('./walker')
const { yamlparser, yamllistparser, mdparser } = require('./parser')

//////////////////////////////////////
const outfile = './dist/domains.json'
const infile =  './registry-tango-domains/source/'
const pattern =  /\.ya?ml$/
const keyname = 'name'
const parser = yamllistparser

walker( pattern, infile, keyname, parser, outfile,

  (count) => {
    console.log('Done', count)
  }
)

