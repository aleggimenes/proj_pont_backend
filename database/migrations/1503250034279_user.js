'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('nome', 60).notNullable()
      table.string('email', 80).notNullable()
      table.string('pais', 60).notNullable()
      table.string('estado', 120).notNullable()
      table.string('cep', 140).notNullable()
      table.string('rua', 120).notNullable()
      table.string('numero', 60).notNullable()
      table.string('complemento', 120).notNullable()
      table.string('cpf', 20).notNullable()
      table.string('pis', 80).notNullable()
      table.string('senha', 60).notNullable()
      table.string('recovery_token', 100)
      table.datetime('token_expiration')
      table.timestamps()
    })
  }
  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
