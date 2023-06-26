/**
 *
 * @param {any} knex - initialized knex connection instance to get the schema from
 * @param {string} outDir - directory to write to
 * @param {object} [options]
 * @param {"append"|"write"} [options.mode="write"]
 * @param {string} [options.filename="schema.dbml"]
 * @returns
 */
declare function exportSchema(
  knex: any,
  outDir: any,
  {
    mode,
    filename,
  }?: {
    mode?: string | undefined
    filename?: string | undefined
  }
): Promise<boolean>
