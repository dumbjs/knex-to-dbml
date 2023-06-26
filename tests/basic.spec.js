const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const fs = require('fs')
const knex = require('knex').default
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot')
const { join } = require('path')
const { before } = require('mocha')

const exportSchema = require('../index.js')

chai.use(jestSnapshotPlugin())
chai.use(chaiAsPromised)

const { expect } = chai
let knexInstance

before(async () => {
  knexInstance = knex({
    client: 'sqlite',
    connection: ':memory:',
  })

  await knexInstance.schema.createTable('users', table => {
    table.increments('id')
    table.text('hello')
  })

  await knexInstance.schema.createTable('user_rel', table => {
    table.increments('id')
    table.text('hello')
    table.integer('user_id').references('id').inTable('users')
  })
})

describe('exportSchema', () => {
  it('should fail if no knex is provided', async () => {
    await expect(async () => await exportSchema()).to.throw
  })

  it('should export a file', async () => {
    try {
      await exportSchema(knexInstance, join(__dirname, './db'))
    } catch (err) {
      console.error(err)
    }
    const data = fs.readFileSync(join(__dirname, './db', 'schema.dbml'), 'utf8')
    expect(data).toMatchSnapshot()
  })
})
