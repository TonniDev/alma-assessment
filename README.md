# Alma - Frontend Assessment

The project uses NodeJS version 20 or later. Make sure your local environment is using this version. Ideally use `nvm` or similar.

## Run the project
To start the project run `make up-first-time`.

## Routes available in the browser
- /immigration-assessment
- /auth
- /leads

## Project structure overview
```md
src
|
|--app (next.js app router)
|  |--api/v1 (domains inside: assessment & auth)
|  |--(frontend routes: page specific component live together with the page component)
|
|--lib (any code that would work like an external library)
|  |--definition
|  |--domain (frontend repositories)
|  |--Network (network layer: axios abstraction)
|  |--util (generic utilities and hooks)
|
|--providers (ChakraUI and Query provider)
|
|--ui
|  |--base (base components: abstractions and atomic components)
|  |--components (mid level components)
```

## Alternative way to run

A more manual way to run the project is by:
1. install dependencies with `pnpm i`
2. run the command `make up` on a terminal window/tab
3. on a different terminal run `make migrate` to apply the existing migration to the DB.
