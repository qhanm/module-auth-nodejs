### Create table migration

```
yarn typeorm migration:create src/db/migrations/{table_name}
```

### Migrate DB

```
yarn typeorm migration:run ---dataSource ./src/data-source.ts
```
