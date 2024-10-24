'use strict'

const { Ignitor } = require('@adonisjs/ignitor')
const path = require('path')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(path.join(__dirname))
  .fireHttpServer()
  .catch(console.error)
