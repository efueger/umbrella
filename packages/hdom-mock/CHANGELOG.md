# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.19...@thi.ng/hdom-mock@1.1.20) (2020-04-11)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.18...@thi.ng/hdom-mock@1.1.19) (2020-04-06)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.17...@thi.ng/hdom-mock@1.1.18) (2020-04-06)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.16...@thi.ng/hdom-mock@1.1.17) (2020-04-05)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.15...@thi.ng/hdom-mock@1.1.16) (2020-04-01)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.14...@thi.ng/hdom-mock@1.1.15) (2020-03-28)

**Note:** Version bump only for package @thi.ng/hdom-mock





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.16...@thi.ng/hdom-mock@1.1.0) (2019-07-07)

### Features

* **hdom-mock:** enable TS strict compiler flags (refactor) ([787e2d4](https://github.com/thi-ng/umbrella/commit/787e2d4))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@0.1.5...@thi.ng/hdom-mock@1.0.0) (2019-01-21)

### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols

# 0.1.0 (2018-12-13)

### Features

* **hdom-mock:** add hdom-mock package and implementation, add initial tests ([5609d24](https://github.com/thi-ng/umbrella/commit/5609d24))
