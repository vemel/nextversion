# Next Version

Format, bump, and update a version of Node.js and Python packages action.

- [Next Version](#next-version)
  - [Usage](#usage)
    - [Pre-requisites](#pre-requisites)
    - [Inputs](#inputs)
    - [Outputs](#outputs)
  - [Examples](#examples)
    - [Easy CI/CD for JavaScript/TypeScript and Python projects](#easy-cicd-for-javascripttypescript-and-python-projects)
    - [Other examples](#other-examples)
  - [Contributing](#contributing)
  - [License](#license)

## Usage
### Pre-requisites
Create a workflow `.yml` file in your repositories `.github/workflows` directory. Check [Examples](#examples) below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
| Name | Default | Description |
| - | - | - |
| `path` | `""` | Path to file that contains current version, e.g `package.json`, `pyproject.toml`, `setup.cfg`, `version.txt` |
| `version` | `"0.0.0"` | Current version to bump, use `path` isntead if possible |
| `type` | `"semver"` | Version type: `semver` or `pep440` |
| `release` | `"stable"` | Release type: `stable` `rc`, `alpha` or `beta` |
| `result` | `"patch"` | Version to set as `result`: `major`, `minor`, `patch`, `micro`, `prerelease`, `build`, `postrelease`, or explicit version |
| `update` | `""` | Newline-separated paths to version files to update |
| `encoding` | `"utf-8"` | Encoding for files provided in `path` |

### Outputs
| Name | SemVer Example | PEP440 Example | Description |
| - | - | - | - |
| `major` | `"2.0.0"` | `"2.0.0"` | Next major version |
| `minor` | `"1.3.0"` | `"1.3.0"` | Next minor version |
| `patch` | `"1.2.3"` | `"1.2.3"` | Next patch/micro version |
| `micro` | `"1.2.3"` | `"1.2.3"` | Next patch/micro version |
| `prerelease` | `"1.2.3-rc.2"` | `"1.2.3rc2"` | Next prerelease version |
| `build` | `"1.2.3-rc.1+1"` | `"1.2.3rc1+1"` | Next build/local version |
| `postrelease` | `"1.2.4"` | `"1.2.3.post1"` | Next postrelease version (pep440 only) |
| `result` | `"1.2.3"` | `"1.2.3"` | Next version specified in output |
| `is-prerelease` | `false` | `false` | Whether result version is a prerelease |
| `input` | `"1.2.3-rc.1"` | `"1.2.3rc1"` | Normalized input version |
| `raw-input` | `"v1.2.3-rc.1"` | `"v1.2.3rc1"` | Raw input string |


## Examples

### Easy CI/CD for JavaScript/TypeScript and Python projects

https://github.com/vemel/github_actions_js/

### Other examples
- [Python: Bump version on demand](examples/python-on-demand.yml)
- [Python: Bump version on release published](examples/python-on-release-published.yml)
- [Node.js: Bump version on demand](examples/nodejs-on-demand.yml)
- [Node.js: Bump version on release published](examples/nodejs-on-release-published.yml)

## Contributing
I would love for you to contribute to `actions/nextversion`, pull requests are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
