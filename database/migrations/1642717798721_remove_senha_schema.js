'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveSenhaSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.dropColumn('senha')
    })
  }

  down () {
    this.alter('users', (table) => {
      table.string('senha')
    })
  }
}

module.exports = RemoveSenhaSchema
