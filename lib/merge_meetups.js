const { walker } = require('./walker')
const { yamlparser, yamllistparser, mdparser } = require('./parser')

//////////////////////////////////////
const outfile = './cache-tangodata/dist/meetups.json'
const infile =  './registry-tango-meetups/source/'
const pattern =  /\.ya?ml$/
const keyname = 'Event Name'
const parser = yamllistparser

walker( pattern, infile, keyname, parser, outfile,

  (count) => {
    console.log('Done', count)
  }
)

