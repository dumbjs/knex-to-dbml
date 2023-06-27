# knex-to-dbml

`knex-to-dbml` is a library that generates a DBML instance from a `knex` connection instance. It simplifies the process of defining table columns, so you don't have to repeatedly go through migration files.

## Why use `knex-to-dbml`?

ORMs like bookshelf/objection require you to define table columns as properties on the model, which can be a redundant and time-consuming task. `knex-to-dbml` simplifies this process by generating a DBML instance for you.

The generated DBML can be visualized over at [dbdiagram.io](https://dbdiagram.io/d) or used with other services to migrate from knex to other query builders like Prisma or kysely.

## Usage

> **Note**: This library writes to disk and is not side-effect free. So, be careful and don't blame us if your computer explodes.

### Installation

```bash
npm install knex-to-dbml
```

### API

```ts
type Options = {
  mode?: 'append' | 'write'
  filename?: string
}

async function exportSchema(knex: KnexClient, outDir: string, options: Options)
```

### Example

```js
const exportSchema  = require('knex-to-dbml');
const path = require('path');

await exportSchema(knexInstance, path.join(__dirname, 'db')); // Writes a .dbml file to `./db` directory
```

## Support

If this library has helped you in any way, please consider donating to this repository or any other open source repository that you feel needs support.

## License 

[MIT](/LICENSE)
