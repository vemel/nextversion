# Easy CI/CD for JavaScript/TypeScript projects

- [Easy CI/CD for JavaScript/TypeScript projects](#easy-cicd-for-javascripttypescript-projects)
  - [Summary](#summary)
  - [Secrets](#secrets)
  - [Workflows](#workflows)
    - [Update Pull Request labels](#update-pull-request-labels)
    - [Update Release draft from Pull Request notes](#update-release-draft-from-pull-request-notes)
    - [Create release Pull Request on Release](#create-release-pull-request-on-release)
    - [Publish to NPM on Release Pull Request merged](#publish-to-npm-on-release-pull-request-merged)

GitHub Actions for automated JavaScript/TypeScript projects.

## Summary

- Uses [SemVer](https://semver.org/) versioning schema
- Release and Pull Request notes follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format
- Supports publishing new versions to [npm](https://www.npmjs.com/)
- Automatically bumps version in `package.json` and adds published Release notes to `CHANGELOG.md`

## Secrets

- `NPM_TOKEN` - If set, new version is published to [npm](https://www.npmjs.com/)

## Workflows

### Update Pull Request labels

Workflow: [on_pull_opened_or_edited.yml](nodejs_workflows/on_pull_opened_or_edited.yml)

- Starts on Pull Request opened or edited event
- Pull Request notes must be in [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format
- If Pull Request branch name is `release/*`, adds `release` label
- If Pull Request notes has `Removed` section, adds `major` label
- If Pull Request notes has `Added`, `Changed` or `Deprecated` sections, adds `minor` label
- Otherwise adds `patch` label

```bash
# download workflows to GitHub Action directory
# run this command from a GitHub repository root
curl https://github.com/vemel/nextversion/blob/main/nodejs_workflows/on_pull_opened_or_edited.yml -o nodejs_workflows/on_pull_opened_or_edited.yml
```

### Update Release draft from Pull Request notes

Workflow: [on_pull_merged.yml](nodejs_workflows/on_pull_merged.yml)

- Starts on Pull Request merge for non-`release/*` branch
- Creates or updates a Release draft for Pull Request base branch
- Release draft notes are merged from existing notes and Pull Request notes
- Each entry added from Pull Request notes contains a link to the Pull Request 
- Release draft suggested version is based on Release notes

```bash
# download workflows to GitHub Action directory
# run this command from a GitHub repository root
curl https://github.com/vemel/nextversion/blob/main/nodejs_workflows/on_pull_merged.yml -o nodejs_workflows/on_pull_merged.yml
```

### Create release Pull Request on Release

Workflow: [on_release_published.yml](nodejs_workflows/on_release_published.yml)

- Starts on Release published
- Release notes must be in [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format
- Creates a Release Pull Request from Release target branch with `release` label
- Release Pull Request contains only version bump in `package.json` and updated `CHANGELOG.md`
- Release Pull Request uses branch `release/<version>`

```bash
# download workflows to GitHub Action directory
# run this command from a GitHub repository root
curl https://github.com/vemel/nextversion/blob/main/nodejs_workflows/on_release_published.yml -o nodejs_workflows/on_release_published.yml
```

### Publish to NPM on Release Pull Request merged

Workflow: [on_release_pull_merged.yml](nodejs_workflows/on_release_pull_merged.yml)

- Starts on Pull Request merge for `release/*` branch
- Uses Pull Request branch for deployment, so released version contains only changes
  from base branch when Release had been published
- Publishes new version to [npm](https://www.npmjs.com/) if `NPM_TOKEN` secret is set

```bash
# download workflows to GitHub Action directory
# run this command from a GitHub repository root
curl https://github.com/vemel/nextversion/blob/main/nodejs_workflows/on_release_pull_merged.yml -o nodejs_workflows/on_release_pull_merged.yml
```
