const { writeFile, appendFile, mkdir } = require('fs/promises')
const inspect = require('knex-schema-inspector').default
const { join, extname, dirname } = require('path')

exports = module.exports = exportSchema

/**
 *
 * @param {any} knex - initialized knex connection to get the schema from
 * @param {string} outDir - directory to write to
 * @param {object} [options]
 * @param {"append"|"write"} [options.mode="write"]
 * @param {string} [options.filename="schema.dbml"]
 * @returns
 */
async function exportSchema(
  knex,
  outDir,
  { mode = 'write', filename = 'schema.dbml' } = {}
) {
  if (!knex) {
    throw new Error('knex is a required argument')
  }
  const schema = inspect(knex)
  let tableDefs = []
  let refs = []

  const outFilePath = join(outDir, filename.replace(extname(filename), '.dbml'))

  const tables = await schema.tables()
  for (let tableName of tables) {
    let tableDef = `Table ${tableName} {\n`
    const cols = await schema.columnInfo(tableName)
    for (let col of cols) {
      const colProps = [
        col.is_primary_key && 'pk',
        col.unique && 'unique',
      ].filter(Boolean)
      tableDef += `\t ${col.name} ${col.data_type}`
      if (colProps.length) {
        tableDef += ` [${colProps}]`
      }
      tableDef += '\n'

      if (col.foreign_key_table && col.foreign_key_column) {
        refs.push(
          `Ref:${col.table}.${col.name} > ${col.foreign_key_table}.${col.foreign_key_column}`
        )
      }
    }
    tableDef += '}\n'
    tableDefs.push(tableDef)
  }

  const dbml = tableDefs.concat(refs).join('\n')

  // Prepare directory
  await mkdir(dirname(outFilePath), { recursive: true })

  if (mode == 'append') {
    await appendFile(outFilePath, dbml, 'utf-8')
  } else {
    await writeFile(outFilePath, dbml, 'utf8')
  }

  console.log('Exported')
  return true
}
