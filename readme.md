## Usage

**Not SideEffect Free**

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
