const Xvfb = require('xvfb')
new Xvfb().startSync()

require('./server.js')