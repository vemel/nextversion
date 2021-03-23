# Next Version

Format, bump, and update a version of Node.js and Python packages action.

Current version: 0.0.1

- [Next Version](#next-version)
  - [Usage](#usage)
    - [Pre-requisites](#pre-requisites)
    - [Inputs](#inputs)
    - [Outputs](#outputs)
  - [Examples](#examples)
  - [TODO](#todo)
  - [Contributing](#contributing)
  - [License](#license)

## Usage
### Pre-requisites
Create a workflow `.yml` file in your repositories `.github/workflows` directory. Check [Examples](#examples) below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
| Name | Default | Description |
| - | - | - |
| `version` | `"0.0.0"` | Version to bump |
| `version-path` | `""` | Path to file that contains current version, e.g `package.json`, `pyproject.toml`, `setup.cfg`, `version.txt` |
| `type` | `"semver"` | Version type: `semver` or `pep440` |
| `prerelease` | `"false"` | Output prerelease versions, `true` or `false` |
| `prerelease-type` | `"rc"` | Prerelease type: `rc`, `alpha` or `beta` |
| `result` | `"patch"` | Version to set as `result`: `major`, `minor`, `patch`, `micro`, `prerelease`, or explicit version |
| `release-notes` | `""` | Set `result` based on release notes in [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format |
| `update-path` | `""` | Newline-separated paths to version files to update |
| `encoding` | `"utf-8"` | Encoding for files provided in `path` |

### Outputs
| Name | Example | Description |
| - | - | - |
| `major` | `"2.0.0"` | Next major version |
| `minor` | `"1.3.0"` | Next minor version |
| `patch` | `"1.2.3"` | Next patch/micro version |
| `micro` | `"1.2.3"` | Next patch/micro version |
| `prerelease` | `"1.2.3-rc.2"` | Next prerelease version |
| `result` | `"1.2.3"` | Next version specified in output |
| `input` | `"1.2.3-rc.1"` | Normalized input version |
| `raw-input` | `"v1.2.3-rc.1"` | Raw input string |


## Examples
- [Python: Bump version on demand](examples/python-on-demand.yml)
- [Python: Bump version on release published](examples/python-on-release-published.yml)
- [Node.js: Bump version on demand](examples/nodejs-on-demand.yml)
- [Node.js: Bump version on release published](examples/pnodejs-on-release-published.yml)

## TODO
- [ ] Add postrelease support
- [ ] Add min result version parameter

## Contributing
I would love for you to contribute to `actions/nextversion`, pull requests are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
