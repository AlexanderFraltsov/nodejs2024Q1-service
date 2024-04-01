# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Checkout on task branch
```
git checkout -b task2 remotes/origin/task2
```

## Installing NPM modules

```
npm install
```

## Add environment file
rename `.env.example` to `.env` file

## Docker

### Running application

```
npm run docker:up
```

You can watch logs in other terminal:

```
docker-compose logs -f
```

After application running on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

Database logs are written in db-logs:/var/log/postgresql volume
Database data is written to db-data:/var/lib/postrgesql/data volume


### Stop and remove containers and networks

```
npm run docker:down
```

### Scan vulnerability

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## create migration file
```
npm run migration:generate src/migrations/<MIGRATION_NAME>
```

## Apply migrations

```
npm run migration:run
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
