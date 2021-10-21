## System requirements

- [nodejs >= 14](https://nodejs.org/en/)
- [yarn >= 3](https://yarnpkg.com/) (for managing dependencies)

## Setup

> Note: this project uses
> [yarn 3 (berry) workspaces](https://yarnpkg.com/features/workspaces).

After cloning the repository, from the project's root directory run `yarn` to
install packages.

From the project's root directory, you can run the following scripts:

- `yarn check-formatting`: checks code formatting
- `yarn fix-formatting`: fixes code formatting
- `yarn test`: runs each workspace's tests
- `yarn build`: builds each workspace's code
- `yarn workspace workspace-name run script-name`: run a workspace-specific
  script

## Conventions

- [prettier](https://prettier.io) is used to enforce code formatting. You can
  fix code formatting by running `yarn fix-formatting` from the project's root
  directory, though installing the prettier extension for your editor of choice
  is highly recommended

## CI workflow

When a commit is pushed, the CI server runs the automated QA checks.

When a tag is pushed, the CI server - if QA checks succeed - builds and
publishes artifacts.
