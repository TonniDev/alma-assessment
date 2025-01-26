# Alma - Frontend Assessment

The project uses NodeJS version 20 or later. Make sure your local environment is using this version. Ideally use `nvm` or similar.

To start the project run `make up-first-time`.

The routes are:

- /immigration-assessment
- /auth
- /leads


The structure is as follows:

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
