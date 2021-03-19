# Next Version

Format, bump, and update a package version.

## Usage

### Pre-requisites
Create a workflow `.yml` file in your repositories `.github/workflows` directory. An [example workflow](#example-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs

* `version` - Version to bump (required!)
* `type` - Version type: `semver` or `pep440` (default: `semver`)
* `prerelease` - Output prerelease versions, `true` or `false` (default: `false`)
* `prerelease-type` - Prerelease type: `rc`, `alpha` or `beta` (default: `rc`)
* `result` - Version to set as `result`: `major`, `minor`, `patch`, `micro` or `prerelease` (default: `patch`)
* `path` - Newline-separated paths to version files to update (default: ``)

### Outputs

* `major` - Next major version
* `minor` - Next minor version
* `patch` - Next patch/micro version
* `micro` - Next patch/micro version
* `prerelease` - Next prerelease version
* `result` - Next version specified in output
* `input` - Normalized input version
* `raw-input` - Raw string input

### Example workflow

```yaml
name: Bump version on demand

on:
  workflow_dispatch:
    inputs:
      release:
        description: 'Release type: major, minor or patch'
        required: true
        default: 'patch'
      is-prerelease:
        description: 'Create a Release Candidate: true or false'
        required: true
        default: 'false'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Get current version
      id: old-version
      run: |
        VERSION=`python setup.py --version`
    - name: Bump version
      id: version
      uses: actions/next-version@v1
      with:
        version: ${{ steps.old-version.outputs.result }}
        type: pep440
        result: ${{ github.event.inputs.release }}
        prerelease: ${{ github.event.inputs.is-prerelease }}
        prerelease-type: rc
        paths: |
          ./setup.cfg
          ./pyproject.toml
          ./mypackage/version.txt
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v3
        with:
          title: "Bump version to ${{ steps.version.outputs.result }}"
```

## Contributing
We would love for you to contribute to `actions/bump-version`, pull requests are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
