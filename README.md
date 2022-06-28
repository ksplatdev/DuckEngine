# ![DuckEngine](global/Logo.png)

**v2.0.0 released! [Changelog](CHANGELOG.md)**

| [Docs](#docs) | [Wiki](#wiki) | [Getting Started](https://github.com/ksplatdev/DuckEngine/wiki/Getting-Started) | [Demos](#demos) | [Download](#download) |

![Build Badge](https://img.shields.io/github/workflow/status/ksplatdev/DuckEngine/CodeQL?style=flat-square)
![Release Badge](https://img.shields.io/github/v/release/ksplatdev/DuckEngine?style=flat-square)
![License Badge](https://img.shields.io/github/license/ksplatdev/DuckEngine?label=license&style=flat-square)
[![wakatime](https://wakatime.com/badge/github/ksplatdev/DuckEngine.svg)](https://wakatime.com/badge/github/ksplatdev/DuckEngine)
![Lint Badge](https://github.com/ksplatdev/DuckEngine/actions/workflows/lint.yml/badge.svg)
![Format Badge](https://github.com/ksplatdev/DuckEngine/actions/workflows/format.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A 2D Game Engine for the web.

## Features

- Customizable Hitbox Based Physics Engine
- Multiple Scenes
- Fast & Performant
- Sprites & Spritesheets
- Many GameObjects
- Plugins & PluginManager
- Multiple Cameras with Effects
- Animations & State Machines & Cutscenes
- Hitboxes and Colliders
- Keyboard, and Mouse Inputs
- DPR / Mobile Scaling
- Advanced Particle System
- Cache & Fast Loading Times
- Effects and Presets
- Advanced UI System
- Groups & Management
- Advanced Tilemap System
- Small Package Size
- Static Lighting
- Asset Preloader & Manager
- Textures & Manager
- Made fully in TypeScript
- Typedefs
- [Docs](#docs)
- A lot more...

## Performance & Compatibility

### Browser Requirements

1. Browser supports ES6 (EcmaScript2015)
2. Browser supports Canvas APIs

### Rankings

1. Chromium Based Browsers, includes Chrome, Opera, Edge, Vivaldi, and Brave
2. Safari
3. Firefox | [Bugs](#firefox-bugs)

### Recommendation

- Google Chrome or any other Chromium based browser

### Browser Bugs

#### Firefox Bugs

- More stuttering than Chromium Browsers and Safari.
- Garbage collection occurs more often than Safari and Chromium Browsers. (Causes *very* minor and not noticeable stutters.)

## Download

### Github

1. Download the [latest release](https://github.com/ksplatdev/DuckEngine/releases/latest).
2. Setup an asset bundler like webpack or parcel.
3. Import DuckEngine.
4. Read the [docs](https://ksplatdev.github.io/DuckEngine/).

### NPM

1. Run `npm install duckengine`.
2. Setup an asset bundler like webpack or parcel.
3. Import DuckEngine.
4. Read the [docs](https://ksplatdev.github.io/DuckEngine/).

### CDN

1. Setup an asset bundler like webpack or parcel.
2. Import DuckEngine from URL
   - Regular <https://cdn.jsdelivr.net/npm/duckengine@2.1.0/dist/index.js>
   - Minified <https://cdn.jsdelivr.net/npm/duckengine@2.1.0/dist/index.min.js>
3. Read the [docs](https://ksplatdev.github.io/DuckEngine/).

### Itch.io

1. Download DuckEngine from <https://ksplatdev.itch.io/duckengine>
2. Import DuckEngine into your project.
3. Read the [docs](https://ksplatdev.github.io/DuckEngine/).

## [Docs](https://ksplatdev.github.io/DuckEngine/)

Learn how to use DuckEngine with simple, clean, documentation with typings and more.

## [Discussions](https://github.com/ksplatdev/DuckEngine/discussions)

Ask questions, share ideas, engage with the community, and share your work with DuckEngine Discussions.

## [Wiki](https://github.com/ksplatdev/DuckEngine/wiki)

Read and learn about DuckEngine with the DuckEngine wiki.

## How to use with Typescript

How to use DuckEngine with Typescript.

1. Setup webpack/parcel and tsconfig.
2. Import DuckEngine and Duck for types.

Not working? Add the following to your tsconfig.json

```json
{
    "typeRoots": [
        "./node_modules/@types",
        "path_to_duckengine_index.d.ts"
    ],
    "types": [
        "DuckEngine"
    ]
}
```

### Duck Namespace

The Duck Namespace has types such as gameobject, every class config, all classes, and more.

### [Typescript Example](examples/ts/myScene.ts)

## Developers' Guide

### Requirements

1. Knowledge of TypeScript, Git, and HTML Canvas.
2. Reading and agreeing to the [Contributing](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) documents.
3. Basic knowledge of how DuckEngine works.

### How to contribute

1. Reading and agree to the [Contributing](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) documents.
2. Fork the repository and create a new branch following the [branch guidelines](branch_guidelines.md).
3. Clone the fork to your device.
4. CD (change directories) into the cloned directory.
5. Run `yarn upgrade`.
6. Run `yarn run build` or `ctrl + shift + b` for vscode users.
7. Make your changes.
8. Test your changes on codesandbox by forking this [codesandbox](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js) and updating the duckengine.js file. (Or any other way you would like to test it.)
9. Create a pull request.
10. Wait for it to be reviewed and revised and possibly merged.

### Dev Scripts

1. `yarn run test` - Opens the [codesandbox test](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js).
2. `yarn run build` - Compiles typescript, bundles files, creates minified version, builds docs, and copies package.json to dist.
3. `yarn run build:docs` - Uses TypeDoc to build docs.
4. `yarn run webpack` - Bundles files in lib directory.
5. `yarn run minify` - Uses uglifyjs to minify bundled file.
6. `yarn run format` - Uses Prettier to format files.
7. `yarn run format:watch` - Watches for changes and formats once changes are saved.
8. `yarn run lint` - Uses ESLint to lint all files in the src directory.
9. `yarn run lint:watch` - Watches for changes and fixes all fixable issues found by ESLint.
10. `yarn run lint:fix` - Uses ESLint to fix all fixable issues found by ESLint.
11. `yarn run tree` - Prints out all files and directories used in [readme](#file-structure).
12. `yarn run serve` - Serves the docs on :8080.
13. `yarn run checkout` - Runs the checkout shell script with bash. Run before thinking about publishing a release.

### Branches

1. main - main branch
2. staging - stage changes to this branch

## Versions

DuckEngine follows [SemVer](https://semver.org/).

## Demos

### [Simple Demo Game](https://github.com/ksplatdev/DuckEngine-Demo-Game/tree/main)

### [Test Template](https://codesandbox.io/s/duckengine-test-7gfbt?file=/src/scene.js)

### [Particle Test](https://codesandbox.io/s/duckengine-particle-test-dhcr1?file=/src/scene.js)

### [Tilemap test](https://codesandbox.io/s/duckengine-tilemap-test-ryqqz?file=/src/scene.js)

## Attribution

The cube in the [DuckEngine Logo](global/Logo.png) is by José Manuel de Laá from the Noun Project.

## License

[MIT](LICENSE)

## Author

Bleart Emini
