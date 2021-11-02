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

- `@excalideck/deck`: contains the definitions of the core interfaces (`Deck`,
  `Slide`, etc) and functions to operate on them
- `@excalideck/excalideck-editor`: contains the `ExcalideckEditor` component
- `@excalideck/persistent-excalideck-editor`: contains the
  `PersistentExcalideckEditor` component, that builds upon the
  `ExcalideckEditor` component, adding file-saving capabilities
- `@excalideck/excalideck-file`: contains the `ExcalideckFile` object, used to
  save and load Excalideck files
- `@excalideck/slide-renderers`: contains renderers to render slides in
  different formats
- `@excalideck/webapp`: contains the Excalideck webapp

## Conventions

- [prettier](https://prettier.io) is used to enforce code formatting
- [eslint](https://eslint.org/) is used to enforce some common coding best
  practices

## CI workflow

When a commit is pushed, the CI server runs the automated QA checks.

When a tag is pushed, the CI server - if QA checks succeed, and if approval is
given by one of the maintainers - builds and publishes artifacts.
