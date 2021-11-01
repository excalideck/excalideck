## System requirements

- [nodejs >= 16](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/) (for managing dependencies)

## Setup

> Notes:
>
> - this project uses
>   [yarn (berry) workspaces](https://yarnpkg.com/features/workspaces)
> - this project **does not** use
>   [yarn (berry) plug'n'play](https://yarnpkg.com/features/pnp)

After cloning the repository, from the project's root directory run `yarn` to
install packages.

From the project's root directory, you can run the following scripts:

- `yarn lint`: lints the code (with eslint)
- `yarn check-formatting`: checks code formatting
- `yarn fix-formatting`: fixes code formatting
- `yarn test`: runs each workspace's tests
- `yarn build`: builds each workspace's code
- `yarn workspace package-name run script-name`: run a workspace-specific script

## Packages

### `@excalideck/deck`

Contains the definitions of the core interfaces (`Deck`, `Slide`, etc) and
functions to operate on them.

#### Scripts:

- `yarn workspace @excalideck/deck test`: runs unit tests (add `--watch` for the
  interactive mode)
- `yarn workspace @excalideck/deck build`: builds the package

### `@excalideck/excalideck-editor`

Contains the `ExcalideckEditor` component.

#### Scripts:

- `yarn workspace @excalideck/excalideck-editor start`: starts a development
  server to interactively develop the component
- `yarn workspace @excalideck/excalideck-editor test`: runs unit tests (add
  `--watch` for the interactive mode)
- `yarn workspace @excalideck/excalideck-editor build`: builds the package

### `@excalideck/persistent-excalideck-editor`

Contains the `PersistentExcalideckEditor` component, that builds upon the
`ExcalideckEditor` component, adding file-saving capabilities.

#### Scripts:

- `yarn workspace @excalideck/persistent-excalideck-editor start`: starts a
  development server to interactively develop the component
- `yarn workspace @excalideck/persistent-excalideck-editor build`: builds the
  package

### `@excalideck/excalideck-file`

Contains the `ExcalideckFile` object, used to save and load Excalideck files.

#### Scripts:

- `yarn workspace @excalideck/excalideck-file build`: builds the package

### `@excalideck/slide-renderers`

Contains renderers to render slides in different formats.

#### Scripts:

- `yarn workspace @excalideck/slide-renderers build`: builds the package

### `@excalideck/webapp`

Contains the Excalideck webapp.

#### Scripts:

- `yarn workspace @excalideck/excalideck-editor start`: starts a development
  server to interactively develop the app
- `yarn workspace @excalideck/excalideck-editor test`: runs unit tests (add
  `--watch` for the interactive mode)
- `yarn workspace @excalideck/excalideck-editor build`: builds the app

## Conventions

- [prettier](https://prettier.io) is used to enforce code formatting
- [eslint](https://eslint.org/) is used to enforce some common coding best
  practices

## CI workflow

When a commit is pushed, the CI server runs the automated QA checks.

When a tag is pushed, the CI server - if QA checks succeed, and if approval is
given by one of the maintainers - builds and publishes artifacts.
