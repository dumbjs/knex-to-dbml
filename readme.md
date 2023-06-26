# knex-to-dbml

It's hard to memorize every change that you've possibly made with migrations when working with knex or any query builder system. 

One such solution is to use ORM's like bookshelf / objection and define the table columns as properties on the model which is a pretty redundant and time taking task and easy to miss. 

This is where `knex-to-dbml` comes in, it's a simple library that takes in a `knex` connection instance and generates a DBML instance for you. 

> I wasn't able to find one so I built one. 

This DBML can then be visualised over at [dbdiagram.io](https://dbdiagram.io/d) or used with other services to even migrate from knex to let's say Prisma / kysely. 

## Usage

> **Note**: This library writes to disk and is hence not side-effect free 
> We might split the API into 2 functions over the versions but know that it's not side-effect free right now (v0.0.3)

```ts
type Options = {
  mode?: 'append' | 'write'
  filename?: string
}

async function exportSchema(knex: KnexClient, outDir: string, options: Options)
```

**Example**

```js
await exportSchema(knexInstance, join('./db')) //=> Writes a .dbml file to `./db` directory
```

## Support

If this library has helped you in any way or form, do consider donating to either this repository or any other open source repository that you feel like needs support.

## License 
[MIT](/LICENSE)