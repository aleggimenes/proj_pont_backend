'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterSenhaNameSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.string('password')
    })
  }

  down () {
    this.table('users', (table) => {
      table.string('senha')
    })
  }
}

module.exports = AlterSenhaNameSchema
